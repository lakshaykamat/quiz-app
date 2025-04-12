import React from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>Test Your Programming Knowledge</h1>
      <p className={styles.subtext}>
        Ready to challenge yourself? Take our interactive programming quiz and
        see how well you really know your favorite languages, frameworks, and concepts!
      </p>
      <Link href="/quiz" className={styles.button}>
        Start Quiz
      </Link>
      <div style={{ fontSize: "5rem", marginTop: "3rem" }}>💻📝</div>
    </section>
  );
};

export default Hero;
