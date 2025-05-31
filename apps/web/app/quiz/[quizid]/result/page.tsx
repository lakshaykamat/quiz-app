"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/lib/store/user-store";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

export default function QuizEndPage() {
  const { user, refreshUser } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [animatedScore, setAnimatedScore] = useState(0);

  const score = Number(searchParams.get("score") || 0);
  const title = searchParams.get("title") || "Python Basics Quiz";
  const answersJson = searchParams.get("answers");
  const answers = answersJson
    ? JSON.parse(decodeURIComponent(answersJson))
    : [];

  const correctCount = answers.filter((a: any) => a.isCorrect).length;
  const wrongCount = answers.length - correctCount;

  useEffect(() => {
    refreshUser();
  }, []);

  // Animate score count-up
  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.2,
      onUpdate(value) {
        setAnimatedScore(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [score]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Title & Score */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl font-extrabold text-primary"
        >
          {animatedScore}
        </motion.div>

        <p className="text-muted-foreground text-sm">
          ✅{correctCount} | ❌{wrongCount}
        </p>
        {/* <p className="text-muted-foreground text-sm">

          XP: <span className="font-semibold">{user?.xp}</span> | Level:{" "}
          <span className="font-semibold">{user?.level}</span>
        </p> */}

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button className="hover:cursor-pointer" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button className="hover:cursor-pointer" variant="secondary" onClick={() => router.back()}>
            Replay Quiz
          </Button>
        </div>
      </div>

      {/* Score Summary */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center space-y-2 mt-4"
      >
        <p className="text-lg font-medium">Total Questions: {answers.length}</p>
        <p className="text-green-600 font-semibold">✅ Correct: {correctCount}</p>
        <p className="text-red-600 font-semibold">❌ Wrong: {wrongCount}</p>
      </motion.div> */}

      {/* Answers Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {answers.map((ans: any, idx: number) => (
          <ExplanationCard key={idx} idx={idx} ans={ans} />
        ))}
      </div>
    </div>
  );
}
const ExplanationCard = ({ ans, idx }: { ans: any; idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className={`border rounded p-4 space-y-2 shadow ${
        ans.isCorrect
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
      }`}
    >
      <p className="text-base font-semibold">
        #{idx + 1}: {ans.questionText}
      </p>
      {/* <p>
        <span className="font-medium">Your Answer:</span>{" "}
        <span className="font-semibold">{ans.userAnswer}</span>
      </p> */}
      <p>
        <span className="font-medium">Answer:</span>{" "}
        <span className="font-semibold">{ans.correctAnswer}</span>
      </p>
      {/* <p
        className={`font-semibold ${
          ans.isCorrect ? "text-green-600" : "text-red-600"
        }`}
      >
        {ans.isCorrect ? "✅ Correct" : "❌ Wrong"}
      </p> */}
      {ans.explanation && (
        <p className="text-muted-foreground text-sm">
          <span>{ans.explanation}</span>
        </p>
      )}
    </motion.div>
  );
};
