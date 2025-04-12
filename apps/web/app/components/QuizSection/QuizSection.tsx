"use client";

import React from "react";
import styles from "./QuizSection.module.css";
import QuizCard from "../QuizCard/QuizCard";

const QuizSection: React.FC = () => {
  const quizzes = [
    {
      title: "JavaScript Basics",
      description: "Test your knowledge of JS syntax, variables, and functions.",
      icon: "🟨",
      href: "/quiz/javascript",
    },
    {
      title: "Python Fundamentals",
      description: "Challenge yourself with Python data types and loops.",
      icon: "🐍",
      href: "/quiz/python",
    },
    {
      title: "React Essentials",
      description: "Quiz yourself on React components, hooks, and props.",
      icon: "⚛️",
      href: "/quiz/react",
    },
    {
      title: "Algorithms & Data Structures",
      description: "See how well you handle arrays, trees, and sorting problems.",
      icon: "📊",
      href: "/quiz/algorithms",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Choose Your Quiz</h2>
      <div className={styles.grid}>
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.title}
            title={quiz.title}
            description={quiz.description}
            icon={quiz.icon}
            href={quiz.href}
          />
        ))}
      </div>
    </section>
  );
};

export default QuizSection;
