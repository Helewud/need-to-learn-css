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
  let className = `${styles["select-button-dark"]}`;
  let statusIcon = null;

  if (status === "correct") {
    className += ` ${styles["correct"]}`;
    statusIcon = <CorrectIcon />;
  }

  if (status === "incorrect") {
    className += ` ${styles["incorrect"]}`;
    statusIcon = <IncorrectIcon />;
  }

  return (
    <button className={className}>
      <QuizOptionIcon letter={option} />
      <div className={styles["text-area"]}>
        <p>{text}</p>
        {statusIcon}
      </div>
    </button>
  );
};
