"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./QuizLanding.module.css";

export default function QuizLandingPage() {
  const params = useParams();
  const quizId = params?.quizid;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📝 {quizId?.toString().toUpperCase()} Quiz</h1>
      <p className={styles.description}>
        Test your knowledge in {quizId} with this timed, interactive quiz.
      </p>
      <Link href={`/quiz/${quizId}/playground`} className={styles.startButton}>
        Start Quiz →
      </Link>
    </div>
  );
}
