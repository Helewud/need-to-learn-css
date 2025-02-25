import { useContext } from "react";
import { CorrectIcon, IncorrectIcon } from "../../components/core/Icon/Icon";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Quiz.module.scss";

interface QuizInputGroupProps {
  options: string[];
  selection?: string;
  answer?: string;
  clickAction?: (e: React.MouseEvent) => void;
}

export const QuizInputGroup: React.FC<QuizInputGroupProps> = ({
  clickAction,
  options,
  selection,
  answer,
}) => {
  const { theme } = useContext(ThemeContext);

  const OptionIcon = ({ letter }: { letter: string }) => {
    return (
      <div className={styles["option-icon"]}>
        <p>{letter}</p>
      </div>
    );
  };

  const handleQuestionStatus = (
    option: string,
    selection?: string,
    answer?: string
  ) => {
    let status = "";
    let statusIcon = null;
    let inputStatusStyle = null;

    if (option === answer) status = "default";

    if (option === answer && option === selection) status = "correct";

    if (option !== answer && option === selection) status = "incorrect";

    if (status === "default") {
      statusIcon = <CorrectIcon />;
    }

    if (status === "correct") {
      inputStatusStyle = styles["correct"];
      statusIcon = <CorrectIcon />;
    }

    if (status === "incorrect") {
      inputStatusStyle = styles["incorrect"];
      statusIcon = <IncorrectIcon />;
    }

    return [inputStatusStyle, statusIcon];
  };

  return (
    <fieldset className={styles["options"]}>
      {options.map((op, i) => {
        const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
        const id = `option-${i + 1}`;
        const [labelStyle, icon] = handleQuestionStatus(op, selection, answer);

        let inputStyle = styles[`select-input-${theme}`];
        if (labelStyle) inputStyle += ` ${labelStyle}`;
        if (selection) inputStyle += ` ${styles["disabled"]}`;

        return (
          <label key={id} htmlFor={id} className={inputStyle}>
            <input
              key={id}
              type="radio"
              id={id}
              name="option-selection"
              value={op}
              onClick={clickAction}
            />

            <OptionIcon letter={optionLetter} />

            <div className={styles["text-area"]}>
              <p>{op}</p>
              {icon}
            </div>
          </label>
        );
      })}
    </fieldset>
  );
};
