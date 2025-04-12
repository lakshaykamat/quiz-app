"use client";

import React, { useState } from "react";
import styles from "./QuizQuestion.module.css";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Props = {
  questions: Question[];
};

const QuizQuestion: React.FC<Props> = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (questions[current] && option === questions[current].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      {!showResult ? (
        <div className={styles.card}>
          <h2 className={styles.question}>{questions[current] && questions[current].question}</h2>
          <div className={styles.options}>
            {questions[current] && questions[current].options.map((option) => (
              <button
                key={option}
                className={styles.optionButton}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                style={
                  selected === option && questions[current]
                    ? {
                        backgroundColor:
                          option === questions[current].correctAnswer
                            ? "#10b981"
                            : "#ef4444",
                        color: "#fff",
                      }
                    : {}
                }
              >
                {option}
              </button>
            ))}
          </div>
          {selected && (
            <button onClick={handleNext} className={styles.nextButton}>
              {current + 1 < questions.length ? "Next Question" : "View Result"}
            </button>
          )}
        </div>
      ) : (
        <div className={styles.result}>
          🎉 You scored {score} / {questions.length}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
