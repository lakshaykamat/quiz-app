"use client";

import React from "react";
import styles from "./Resources.module.css";

type Resource = {
  title: string;
  description: string;
  link: string;
};

const Resources: React.FC = () => {
  const resources: Resource[] = [
    {
      title: "JavaScript MDN Docs",
      description: "The official Mozilla docs for JavaScript fundamentals and APIs.",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      title: "FreeCodeCamp JavaScript Course",
      description: "A full beginner-to-advanced JavaScript course for free.",
      link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    },
    {
      title: "Frontend Mentor Challenges",
      description: "Practice real-world frontend coding challenges.",
      link: "https://www.frontendmentor.io/challenges",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>📚 Resources</h2>
      <div className={styles.list}>
        {resources.map((res) => (
          <a
            key={res.title}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
          >
            <div className={styles.title}>{res.title}</div>
            <div className={styles.description}>{res.description}</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Resources;
