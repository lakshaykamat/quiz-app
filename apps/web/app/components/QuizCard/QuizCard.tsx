"use client";

import React from "react";
import Link from "next/link";
import styles from "./QuizCard.module.css";

type QuizCardProps = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

const QuizCard: React.FC<QuizCardProps> = ({ title, description, icon, href }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={href} className={styles.button}>
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;
