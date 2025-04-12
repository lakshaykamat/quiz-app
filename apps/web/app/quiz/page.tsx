import React from "react";
import styles from "./QuizPage.module.css";
import QuizQuestion from "./components/QuizQuestion/QuizQuestion";

const quizData = [
  {
    question: "What does `const` keyword do in JavaScript?",
    options: [
      "Declares a mutable variable",
      "Declares a constant variable",
      "Deletes a variable",
      "None of the above",
    ],
    correctAnswer: "Declares a constant variable",
  },
  {
    question: "Which HTML tag is used to link external CSS?",
    options: ["<link>", "<style>", "<css>", "<script>"],
    correctAnswer: "<link>",
  },
  {
    question: "Which of these is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Tailwind"],
    correctAnswer: "React",
  },
];

export default function QuizPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>📝 Start Your Quiz</h1>
      <QuizQuestion questions={quizData} />
    </div>
  );
}
