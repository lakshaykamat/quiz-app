"use client";

import { useParams } from "next/navigation";
import styles from "./Playground.module.css";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";

const dummyQuizzes: Record<string, any[]> = {
  javascript: [
    {
      question: "What is 'use strict' in JavaScript?",
      options: ["A variable", "A strict function", "Enforces strict mode", "None"],
      correctAnswer: "Enforces strict mode",
    },
  ],
  python: [
    {
      question: "Which keyword defines a function in Python?",
      options: ["def", "function", "lambda", "define"],
      correctAnswer: "def",
    },
  ],
};

export default function PlaygroundPage() {
  const params = useParams();
  const quizid = params?.quizid?.toString();

  const quizData = dummyQuizzes[quizid as keyof typeof dummyQuizzes];

  if (!quizData) {
    return (
      <div className={styles.page}>
        <h1>Quiz Not Found 🔍</h1>
        <p>No quiz data for {quizid}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📝 {quizid?.toUpperCase()} Quiz</h1>
      <QuizQuestion questions={quizData} />
    </div>
  );
}
