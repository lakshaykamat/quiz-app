"use client";

import React from "react";
import styles from "./AboutFeedback.module.css";

const AboutFeedback: React.FC = () => {
  const handleFeedbackClick = () => {
    alert("Thanks for your feedback! 💜");
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>👨‍💻 About This App</h2>
      <p className={styles.text}>
        This programming quiz web app was built for developers who love to
        challenge themselves and improve their coding knowledge. It covers
        various programming languages, frameworks, and computer science
        concepts in an interactive and fun way.
      </p>
      <p className={styles.text}>
        Got an idea for a new quiz or a suggestion to improve the app? We’d love
        to hear from you!
      </p>
      <span onClick={handleFeedbackClick} className={styles.feedbackLink}>
        Send us your feedback →
      </span>
    </section>
  );
};

export default AboutFeedback;
