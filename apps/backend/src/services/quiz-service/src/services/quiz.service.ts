import * as quizRepo from "../repositories/quiz.repository";
import { decrypt } from "../utils/cyrpto";
import shuffleArray from "../utils/suffleQuestions";
import { Quiz } from "../models/Quiz";
import { getImageURL, modifyImagePathInQuizzes } from "../utils/image.util";


export const createNewQuiz = (data: any) => {
  return quizRepo.createQuiz(data);
};

export const getAllQuizzes = async() => {
  const quizes = await quizRepo.findAllQuizzes();
  return modifyImagePathInQuizzes(quizes);
};

export const getQuizById = async (
  id: string,
  questionLimit: number
): Promise<Quiz> => {
  let quiz = await quizRepo.findQuizById(id)
  
  if (!quiz || !quiz.imageUrl) {
    throw new Error(`Quiz with ID ${id} not found`);
  }
  quiz.imageUrl = getImageURL(quiz.imageUrl)
  
  if(questionLimit == -1){
    questionLimit = quiz.questionIds.length;
  }
  // Shuffle and limit the questions
  let limitedQuestionIds = shuffleArray(quiz.questionIds).slice(
    0,
    questionLimit
  );

  // Decrypt correct answers
  const decryptedQuestions = await Promise.all(
    limitedQuestionIds.map(async (q: any) => {
      const decryptedAnswer = await decrypt(
        q.correctAnswer,
        process.env.QUIZ_SERVICE_ENCRYPTION_KEY as string
      );
      return { ...q, correctAnswer: decryptedAnswer };
    })
  );

  quiz.questionIds = decryptedQuestions;

  return quiz;
};
