"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import QuizHeader from "./components/QuizHeader";
import QuestionCard from "./components/QuestionCard";
import ResultToast from "./components/ResultToast";
import { Progress } from "@/components/ui/progress";
import NextButtonWithTimer from "./components/NextButtonWithTimer";
import { submitQuiz } from "./submitQuiz";
import { useUserStore } from "@/lib/store/user-store";
import socket from "@/lib/socket";

export default function QuizPlayground() {
  const { quizid } = useParams();
  const { user } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(
    null
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const roomId = searchParams.get("roomId") || (quizid as string);
  const isBattleMode = roomId && roomId !== quizid;

  const handleAnswer = (userAnswer: any) => {
    if (!startTime || !currentQuestion) return;

    const isCorrect =
      String(userAnswer).trim() ===
      String(currentQuestion.correctAnswer).trim();
    setShowResult(isCorrect ? "correct" : "wrong");
    setShowExplanation(true);

    const timeTaken = (new Date().getTime() - startTime.getTime()) / 1000;
    let points = 0;
    if (isCorrect) {
      points = 10 + Math.max(0, 5 - timeTaken);
    }

    setScore((prev) => prev + points);
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion._id,
        userAnswer,
        isCorrect,
        timeTaken,
        points,
      },
    ]);
    setStartTime(new Date());
  };

  const handleNext = async () => {
    if (!user || isSubmitted) return;

    setShowResult(null);
    setShowExplanation(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsSubmitted(true);

      const resultAnswers = questions.map((q, i) => ({
        questionText: q.questionText,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswers[i]?.userAnswer,
        isCorrect: userAnswers[i]?.isCorrect,
        explanation: q.explanation,
      }));

      try {
        if (isBattleMode) {
          socket.emit("quiz:finished", {
            roomId,
            userId: user._id,
            username: user.name,
            score,
            answers: resultAnswers,
          });
        } else {
          await submitQuiz({
            userId: user._id,
            quizId: quizid as string,
            score,
            answers: userAnswers,
          });

          toast.success(`Quiz completed! Final Score: ${score}`);
          router.push(
            `/quiz/${quizid}/result?score=${score}&answers=${encodeURIComponent(
              JSON.stringify(resultAnswers)
            )}`
          );
        }
      } catch (e) {
        toast.error("Failed to submit quiz.");
      }
    }
  };

  useEffect(() => {
    const handleBothFinished = ({
      myResult,
      opponentResult,
    }: {
      myResult: any;
      opponentResult: any;
    }) => {
      if (isSubmitted) return;

      setIsSubmitted(true);
      const url = `/quiz/${quizid}/result?me=${encodeURIComponent(
        JSON.stringify(myResult)
      )}&opponent=${encodeURIComponent(JSON.stringify(opponentResult))}`;
      console.log("Redirecting to:", url);
      router.replace(url);
    };

    socket.on("quiz:bothFinished", handleBothFinished);
    return () => {
      socket.off("quiz:bothFinished", handleBothFinished);
    };
  }, [user, quizid, router, isSubmitted]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res: any = await api.get(`quiz/${quizid}?questionLimit=8`).json();
        setQuiz(res);
        setQuestions(res.questionIds);
        setStartTime(new Date());
        setQuizEndTime(Date.now() + 10 * 60 * 1000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load quiz.");
      }
    };
    fetchQuiz();
  }, [quizid]);

  if (!quiz)
    return <div className="text-center py-20 text-lg">Loading quiz...</div>;

  return (
    <div className="px-3 py-6 max-w-4xl mx-auto space-y-8">
      <a href={`/quiz/${quizid}/result?me=123&opponent=456`} target="_blank">Test Result Page</a>

      <Progress value={(currentQuestionIndex / questions.length) * 100} />
      <QuizHeader
        imageUrl={quiz.imageUrl}
        title={quiz.title}
        endTime={quizEndTime!}
        onTimeUp={() => {
          toast.error("Time's up!");
          router.push(`/dashboard`);
        }}
      />

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          showResult={showResult}
          showExplanation={showExplanation}
        />
      )}

      {showResult && (
        <NextButtonWithTimer
          onNext={handleNext}
          duration={5000}
          label={
            currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"
          }
        />
      )}

      <ResultToast result={showResult} />
    </div>
  );
}
