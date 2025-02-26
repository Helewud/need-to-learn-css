import React, { useContext } from "react";
import styles from "./Result.module.scss";
import { ThemeContext } from "../../context/ThemeContext";

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
  const { theme } = useContext(ThemeContext);
  const cardStyle = styles[`card-${theme}`];

  return (
    <div className={cardStyle}>
      {children}
      <section className={styles["text-area"]}>
        <h2>{correctCount}</h2>
        <p className={styles[theme + "-theme"]}>out of {totalCount}</p>
      </section>
    </div>
  );
};
