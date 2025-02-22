import React from "react";
import styles from "./Score.module.scss";

interface ScoreCardProps {
  children: React.ReactNode;
  correctCount: number;
  totalCount: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  children,
  correctCount,
  totalCount,
}) => {
  return (
    <div className={styles["card-dark"]}>
      {children}
      <section className={styles["text-area"]}>
        <h2>{correctCount}</h2>
        <p>out of {totalCount}</p>
      </section>
    </div>
  );
};
