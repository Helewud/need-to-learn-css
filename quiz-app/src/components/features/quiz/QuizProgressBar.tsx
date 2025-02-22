import styles from "./Quiz.module.scss";

export const QuizProgressBar = () => {
  return (
    <div className={styles["progress-track-light"]}>
      <div className={styles["progress-bar"]}></div>
    </div>
  );
};
