import styles from "./Quiz.module.scss";

export const QuizProgressBar = () => {
  return (
    <div className={styles["progress-track-dark"]}>
      <div className={styles["progress-bar"]}></div>
    </div>
  );
};
