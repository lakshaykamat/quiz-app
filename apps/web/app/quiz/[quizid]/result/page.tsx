"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuizEndPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const meData = JSON.parse(decodeURIComponent(searchParams.get("me") || "{}"));
  const opponentData = JSON.parse(decodeURIComponent(searchParams.get("opponent") || "{}"));

  const [animatedMyScore, setAnimatedMyScore] = useState(0);
  const [animatedOpponentScore, setAnimatedOpponentScore] = useState(0);

  const correctCount = meData.answers?.filter((a: any) => a.isCorrect).length || 0;
  const opponentCorrectCount = opponentData.answers?.filter((a: any) => a.isCorrect).length || 0;

  useEffect(() => {
    animate(0, meData.score || 0, {
      duration: 1.2,
      onUpdate(val) {
        setAnimatedMyScore(Math.floor(val));
      },
    });
    animate(0, opponentData.score || 0, {
      duration: 1.2,
      onUpdate(val) {
        setAnimatedOpponentScore(Math.floor(val));
      },
    });
  }, [meData.score, opponentData.score]);

  const totalQuestions = meData.answers?.length || 0;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.h1 className="text-3xl font-bold">🏁 Quiz Battle Result</motion.h1>

        <div className="grid grid-cols-2 gap-4 justify-center text-center">
          <div>
            <h2 className="text-xl font-semibold">{meData.username || "You"}</h2>
            <p className="text-5xl font-bold text-primary">{animatedMyScore}</p>
            <p className="text-muted-foreground">✅ {correctCount} / {totalQuestions}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{opponentData.username || "Opponent"}</h2>
            <p className="text-5xl font-bold text-secondary">{animatedOpponentScore}</p>
            <p className="text-muted-foreground">✅ {opponentCorrectCount} / {totalQuestions}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          <Button variant="secondary" onClick={() => router.back()}>Replay Quiz</Button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="grid gap-4">
        {meData.answers?.map((q: any, idx: number) => {
          const opponentQ = opponentData.answers?.[idx];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 border rounded shadow-sm bg-background"
            >
              <p className="font-semibold mb-2">
                #{idx + 1}: {q.questionText}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className={q.isCorrect ? "text-green-600" : "text-red-600"}>
                  <p><strong>You:</strong> {q.userAnswer} ({q.isCorrect ? "✅" : "❌"})</p>
                </div>
                <div className={opponentQ?.isCorrect ? "text-green-600" : "text-red-600"}>
                  <p><strong>Opponent:</strong> {opponentQ?.userAnswer} ({opponentQ?.isCorrect ? "✅" : "❌"})</p>
                </div>
              </div>
              {q.explanation && (
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Explanation: {q.explanation}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
