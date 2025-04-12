"use client";

import React, { useEffect, useState } from "react";
import styles from "./LiveStats.module.css";

type Stats = {
  users: number;
  quizzesTaken: number;
  averageScore: number;
};

const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    users: 1284,
    quizzesTaken: 3520,
    averageScore: 76,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        users: prev.users + Math.floor(Math.random() * 5), // +0-4 users
        quizzesTaken: prev.quizzesTaken + Math.floor(Math.random() * 10), // +0-9 quizzes
        averageScore: Math.min(100, Math.max(50, prev.averageScore + (Math.random() > 0.5 ? 1 : -1))), // fluctuate ±1
      }));
    }, 8000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Live Quiz Stats 📊</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.users.toLocaleString()}</div>
          <div className={styles.statLabel}>Active Users</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.quizzesTaken.toLocaleString()}</div>
          <div className={styles.statLabel}>Quizzes Taken</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.averageScore}%</div>
          <div className={styles.statLabel}>Avg. Score</div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
