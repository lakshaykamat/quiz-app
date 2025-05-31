"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: any;
  currentIndex: number;
  onAnswer: (userAnswer: any) => void;
  showResult: "correct" | "wrong" | null;
  showExplanation: boolean;
}

export default function QuestionCard({
  question,
  currentIndex,
  onAnswer,
  showResult,
  showExplanation,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);

  useEffect(() => {
    setSelectedAnswer(null); // reset answer on question change
  }, [currentIndex]);

  const optionButtonStyle =
    "text-base px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:cursor-pointer";

  const handleSelectAnswer = (answer: any) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className="border rounded-xl p-6 bg-card shadow-lg space-y-4"
    >
      <pre className="text-lg font-medium whitespace-pre-wrap">
    #{currentIndex + 1} {question?.questionText}
  </pre>

      <div className="flex flex-col flex-wrap gap-3 mt-4">
        {question?.type === 0 &&
          question.options.map((opt: string, idx: number) => (
            <Button
              key={idx}
              onClick={() => handleSelectAnswer(opt)}
              variant="secondary"
              disabled={!!selectedAnswer}
              className={optionButtonStyle}
            >
              {opt}
            </Button>
          ))}

        {question?.type === 1 && (
          <textarea
            placeholder="Write your code here..."
            className="w-full h-40 border rounded p-3 text-sm font-mono"
            disabled={!!selectedAnswer}
          />
        )}

        {question?.type === 2 && (
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => handleSelectAnswer("true")}
              variant="secondary"
              disabled={!!selectedAnswer}
              className={optionButtonStyle}
            >
              True
            </Button>
            <Button
              onClick={() => handleSelectAnswer("false")}
              variant="secondary"
              disabled={!!selectedAnswer}
              className={optionButtonStyle}
            >
              False
            </Button>
          </div>
        )}
      </div>

      {/* {showResult && (
        <div className="mt-6 p-4 border rounded-lg bg-muted/50 space-y-2">
          <p className="font-medium text-lg">
            ✅{" "}
            <span className="text-primary font-semibold">
              {question.correctAnswer}
            </span>
          </p>
          {showExplanation && (
            <p className="text-muted-foreground">{question.explanation}</p>
          )}
        </div>
      )} */}
    </motion.div>
  );
}
