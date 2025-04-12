"use client";

import React, { useState } from "react";
import styles from "./Newsletter.module.css";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for subscribing, ${email}! 🚀`);
    setEmail("");
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>📥 Join Our Newsletter</h2>
      <p className={styles.description}>
        Get new quizzes, coding tips, and updates right to your inbox.
      </p>
      <form className={styles.form} onSubmit={handleSubscribe}>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
