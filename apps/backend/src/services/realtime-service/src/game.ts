// @ts-nocheck
import { Server, Socket } from "socket.io";
import { getQuizWithQuestions } from "./apiClients";

// Types
type GamePlayer = {
  id: string;
  name: string;
  score: number;
  answered: boolean;
  ready: boolean;
};

type QuestionData = {
  id: string;
  text: string;
  correct: string;
};

// Game Class
class Game {
  public players: Record<string, GamePlayer> = {};
  public questions: QuestionData[] = [];
  private currentIndex = 0;

  constructor(
    public roomId: string,
    public quizId: string
  ) {}

  async loadQuestions() {
    const quiz = await getQuizWithQuestions(this.quizId);
    this.questions = quiz.questionIds.map((q: any) => ({
      id: q._id,
      text: q.questionText,
      correct: q.correctAnswer,
    }));
  }

  addPlayer(id: string, name: string) {
    if (!this.players[id]) {
      this.players[id] = {
        id,
        name,
        score: 0,
        answered: false,
        ready: false,
      };
    }
  }

  setReady(id: string) {
    if (this.players[id]) {
      this.players[id].ready = true;
    }
  }

  allReady() {
    return Object.values(this.players).every((p) => p.ready);
  }

  submitAnswer(playerId: string, answer: string) {
    const player = this.players[playerId];
    if (!player) return;

    const correct = this.questions[this.currentIndex]?.correct;
    if (answer === correct) player.score += 10;

    player.answered = true;
  }

  nextQuestion() {
    this.currentIndex++;
    for (const id in this.players) {
      this.players[id].answered = false;
    }
    return this.questions[this.currentIndex];
  }

  bothAnswered() {
    return Object.values(this.players).every((p) => p.answered);
  }

  isReadyToStart() {
    return Object.keys(this.players).length === 2;
  }

  getScores() {
    return Object.values(this.players).map((p) => ({
      id: p.id,
      name: p.name,
      score: p.score,
    }));
  }

  removePlayer(id: string) {
    delete this.players[id];
  }
}

// Singleton game room store
const games: Record<string, Game> = {};

// Register handlers
export function registerSocketHandlers(io: Server, socket: Socket) {
  const readyPlayers = {};
  // Maintain scores temporarily in memory (for simplicity)
  const resultsMap = new Map();
  socket.on("quiz:finished", ({ roomId, userId, username, score, answers }) => {
    if (!resultsMap.has(roomId)) {
      resultsMap.set(roomId, []);
    }

    const currentResults = resultsMap.get(roomId);

    // Avoid duplicate entries for same user
    const alreadySubmitted = currentResults.find((r) => r.userId === userId);
    if (!alreadySubmitted) {
      currentResults.push({ userId, username, score, answers });
    }

    if (currentResults.length === 2) {
      const [player1, player2] = currentResults;

      // Send result to both players (each sees themselves as 'myResult')
      io.to(roomId).emit("quiz:bothFinished", {
        myResult: player1,
        opponentResult: player2,
      });

      io.to(roomId).emit("quiz:bothFinished", {
        myResult: player2,
        opponentResult: player1,
      });

      resultsMap.delete(roomId); // cleanup
    }
  });

  socket.on("submitQuizResult", ({ quizId, userId, score, answers }) => {
    if (!resultsMap.has(quizId)) {
      resultsMap.set(quizId, []);
    }

    const currentResults = resultsMap.get(quizId);
    currentResults.push({ userId, score, answers });

    if (currentResults.length === 2) {
      // Both players submitted
      io.to(quizId).emit("quizResults", currentResults);
      resultsMap.delete(quizId); // Clean up
    }
  });

  // 🔐 Register socket
  socket.on("register", ({ userId }) => {
    socket.join(userId);
    socket.data.userId = userId;
    console.log(`Registered ${userId}`);
  });

  socket.on("joinQuiz", ({ quizId, userId, name, avatarUrl }) => {
    socket.join(quizId);
    socket.quizId = quizId;
    socket.userId = userId;

    // Notify other players someone joined
    socket.to(quizId).emit("player-joined", { userId, name, avatarUrl });

    // Track readiness
    if (!readyPlayers[quizId]) readyPlayers[quizId] = {};
    readyPlayers[quizId][userId] = false;
  });

  // 🎯 Send Invite
  socket.on("inviteFriend", async ({ quizId, friendId, inviter }) => {
    const roomId = `quiz-${quizId}-${Date.now()}`;
    const game = new Game(roomId, quizId);
    await game.loadQuestions();
    games[roomId] = game;

    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.userId = inviter._id; // Store for tracking

    game.addPlayer(socket.id, inviter.name);

    io.to(friendId).emit("invite-received", {
      roomId,
      quizId,
      from: inviter, // Full user object
    });

    console.log(`Invite sent from ${inviter.name} to ${friendId}`);
  });

  // ✅ Accept Invite
  socket.on("accept-invite", ({ roomId }) => {
    const game = games[roomId];
    if (!game) return;

    socket.join(roomId);
    socket.data.roomId = roomId;

    game.addPlayer(socket.id, socket.data.userId || "Player");

    // Notify both players about each other
    const playerData = Object.values(game.players).map((p) => ({
      id: p.id,
      name: p.name,
    }));

    io.to(roomId).emit("players-update", {
      players: playerData,
    });
  });

  // 🟢 Player Ready
  socket.on("player-ready", () => {
    const roomId = socket.data.roomId;
    const game = games[roomId];
    if (!game) return;

    game.setReady(socket.id);

    if (game.allReady()) {
      const question = game.nextQuestion();
      io.to(roomId).emit("startQuiz", { question });
    }
  });
  socket.on("playerReady", ({ quizId, userId }) => {
    if (!readyPlayers[quizId]) return;
    readyPlayers[quizId][userId] = true;

    const allReady = Object.values(readyPlayers[quizId]).every(Boolean);

    if (allReady) {
      io.to(quizId).emit("startQuiz");
      delete readyPlayers[quizId]; // cleanup
    }
  });

  // 📝 Submit Answer
  socket.on("submitAnswer", ({ answer }) => {
    const roomId = socket.data.roomId;
    const game = games[roomId];
    if (!game) return;

    game.submitAnswer(socket.id, answer);

    if (game.bothAnswered()) {
      const next = game.nextQuestion();
      if (next) {
        io.to(roomId).emit("nextQuestion", { question: next });
      } else {
        io.to(roomId).emit("gameOver", { scores: game.getScores() });
      }
    }
  });

  // ❌ Disconnect
  socket.on("disconnect", () => {
    if (socket.quizId && socket.userId && readyPlayers[socket.quizId]) {
      delete readyPlayers[socket.quizId][socket.userId];
    }
  });
}
