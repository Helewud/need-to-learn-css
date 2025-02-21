import styles from "./Quiz.module.scss";

const ProgressBar = () => {
  return (
    <div className={styles["progress-track-light"]}>
      <div className={styles["progress-bar"]}></div>
    </div>
  );
};

export default ProgressBar;
