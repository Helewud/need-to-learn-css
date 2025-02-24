import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { CorrectIcon, IncorrectIcon } from "../../core/Icon/Icon";
import styles from "./Quiz.module.scss";

const QuizOptionIcon = ({ letter }: { letter: string }) => {
  return (
    <div className={styles["option-icon"]}>
      <p>{letter}</p>
    </div>
  );
};

interface QuizSelectButtonProps {
  option: "A" | "B" | "C" | "D";
  text: string;
  status?: "correct" | "incorrect";
}

export const QuizSelectButton: React.FC<QuizSelectButtonProps> = ({
  option,
  text,
  status,
}) => {
  const { theme } = useContext(ThemeContext);
  let buttonStyle = styles[`select-button-${theme}`];

  let statusIcon = null;

  if (status === "correct") {
    buttonStyle += ` ${styles["correct"]}`;
    statusIcon = <CorrectIcon />;
  }

  if (status === "incorrect") {
    buttonStyle += ` ${styles["incorrect"]}`;
    statusIcon = <IncorrectIcon />;
  }

  return (
    <button className={buttonStyle}>
      <QuizOptionIcon letter={option} />
      <div className={styles["text-area"]}>
        <p>{text}</p>
        {statusIcon}
      </div>
    </button>
  );
};
