import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { usePageSetup } from "../../hooks/usePageSetup";
import { Home } from "../Home";
import { Result } from "../Result";
import styles from "./Quiz.module.scss";
import { QuizInputGroup } from "./QuizInput";
import { QuizProgressBar } from "./QuizProgressBar";

export const QuizReview = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const { theme, quiz, setPageContent } = usePageSetup();

  useEffect(() => {
    if (!quiz) {
      setPageContent(<Home />);
      return;
    }
  }, [quiz, setPageContent]);

  let totalCount = 0;
  const currentCount = questionCount + 1;

  const handleNext = useCallback(() => {
    if (currentCount < totalCount) {
      setQuestionCount((prev) => prev + 1);
      return;
    }

    setPageContent(<Result />);
  }, [currentCount, totalCount, setPageContent]);

  const handlePrev = () => {
    setQuestionCount((prev) => prev - 1);
    return;
  };

  if (!quiz) return;

  const currentQuestion = quiz.questions[questionCount];
  totalCount = quiz.questions.length;

  return (
    <div className={styles.content}>
      <div className={styles["question-content"]}>
        <div className={styles["p-bar"]}>
          <QuizProgressBar
            theme={theme}
            progress={(currentCount / totalCount) * 100}
          />
        </div>

        <div className={styles["text-area"]}>
          <p>
            Question {currentCount} of {totalCount}
          </p>
          <h2>{currentQuestion.question}</h2>
        </div>
      </div>

      <div className={styles["options-selection"]}>
        {
          <QuizInputGroup
            theme={theme}
            options={currentQuestion.options}
            selection={currentQuestion.selection}
            answer={currentQuestion.answer}
          />
        }

        {/* Option selection input group, options A,B,C,D */}
        <div className={styles["question-nav"]}>
          <Button
            text={"Previous"}
            clickAction={handlePrev}
            isDisabled={currentCount < 2}
          />

          <Button
            text={currentCount === totalCount ? "Close" : "Next"}
            clickAction={handleNext}
          />
        </div>
      </div>
    </div>
  );
};
