"use client";

import React from "react";
import styles from "./Achievements.module.css";

type Achievement = {
  icon: string;
  title: string;
  description: string;
};

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: "🏅",
      title: "JavaScript Pro",
      description: "Score 90%+ in the JavaScript quiz.",
    },
    {
      icon: "🔥",
      title: "Quiz Streak",
      description: "Complete 5 quizzes in a row.",
    },
    {
      icon: "👑",
      title: "Top Scorer",
      description: "Reach the #1 position on the leaderboard.",
    },
    {
      icon: "📚",
      title: "All-Rounder",
      description: "Complete quizzes in 5 different categories.",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>🏆 Achievements</h2>
      <div className={styles.grid}>
        {achievements.map((item) => (
          <div key={item.title} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
