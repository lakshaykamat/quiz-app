"use client";

import React from "react";
import styles from "./Leaderboard.module.css";

type Player = {
  rank: number;
  name: string;
  score: number;
};

const Leaderboard: React.FC = () => {
  const players: Player[] = [
    { rank: 1, name: "CodeWizard", score: 98 },
    { rank: 2, name: "BugHunter", score: 95 },
    { rank: 3, name: "DevMaster", score: 93 },
    { rank: 4, name: "AsyncNinja", score: 90 },
    { rank: 5, name: "FrontendFan", score: 89 },
    { rank: 6, name: "TypeSafe", score: 87 },
  ];

  const getRankClass = (rank: number) => {
    if (rank === 1) return styles.top1;
    if (rank === 2) return styles.top2;
    if (rank === 3) return styles.top3;
    return "";
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>🏆 Leaderboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score (%)</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank} className={`${getRankClass(player.rank)}`}>
              <td className={`${styles.rank} ${getRankClass(player.rank)}`}>
                {player.rank}
              </td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;
