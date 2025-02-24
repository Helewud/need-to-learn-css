import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./Quiz.module.scss";

export const QuizProgressBar = () => {
  const { theme } = useContext(ThemeContext);
  const barStyle = styles[`progress-track-${theme}`];

  return (
    <div className={barStyle}>
      <div className={styles["progress-bar"]}></div>
    </div>
  );
};
