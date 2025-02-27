import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/core/Button/Button";
import { IncorrectIcon } from "../../components/core/Icon/Icon";
import { PageContentContext } from "../../context/PageContentContext";
import { QuizContext } from "../../context/QuizContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Home } from "../HomePage";
import { Result } from "../ResultPage";
import styles from "./Quiz.module.scss";
import { QuizInputGroup } from "./QuizInput";
import { QuizProgressBar } from "./QuizProgressBar";

export const Quiz = () => {
  const { setPageContent } = useContext(PageContentContext);
  const { theme } = useContext(ThemeContext);
  const { quiz } = useContext(QuizContext);
  const [questionCount, setQuestionCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const optionSelectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length || quiz.completed) {
      setPageContent(<Home />);
    }
  }, [quiz, setPageContent]);

  // if (isLoading) {
  //   return <LoadingOverlay content={"Setting Up Quiz Environment"} />;
  // }

  if (!quiz || !quiz.title || !quiz?.questions?.length) return;

  const { questions } = quiz;
  const currentQuestion = questions[questionCount];
  const currentCount = questionCount + 1;
  const totalCount = questions.length;

  const resetInputActiveState = () => {
    if (optionSelectionRef.current) {
      const fieldSetGroup = optionSelectionRef.current?.children[0];
      const inputList = fieldSetGroup!.children!;

      for (const child of inputList) {
        child.classList.remove(styles["active"]);
      }
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentQuestion.selection) {
      setHasError(true);
      return;
    }

    setHasError(false);
    resetInputActiveState();

    if (currentCount < totalCount) {
      setQuestionCount((prev) => prev + 1);
    }

    if (currentCount >= totalCount) {
      quiz.completed = true;
      setPageContent(<Result />);
    }

    return;
  };

  const handleInputSelection = (e: React.MouseEvent) => {
    setHasError(false);
    resetInputActiveState();

    const target = e.currentTarget as HTMLInputElement;
    currentQuestion.selection = target.value!;

    const inputLabel = target.parentElement!;
    inputLabel.classList.add(styles["active"]);
  };

  return (
    <div className={styles.content}>
      <div className={styles["question-content"]}>
        <div className={styles["p-bar"]}>
          <QuizProgressBar
            theme={theme}
            progress={(currentCount / totalCount) * 100}
          />
        </div>

        <section className={styles["text-area"]}>
          <p className={styles[theme + "-theme"]}>
            Question {currentCount} of {totalCount}
          </p>
          <h2>{currentQuestion.question}</h2>
        </section>
      </div>

      <div ref={optionSelectionRef} className={styles["options-selection"]}>
        {
          <QuizInputGroup
            theme={theme}
            options={currentQuestion.options}
            clickAction={handleInputSelection}
          />
        }

        <div className={styles["options-submission"]}>
          {/* Option selection input group, options A,B,C,D */}
          <Button
            text={currentCount === totalCount ? "Finish Quiz" : "Next Question"}
            clickAction={handleNext}
          />

          {/* Validation error message */}
          {hasError && (
            <div className={styles["validation-message-" + theme]}>
              <IncorrectIcon />
              <p>Please select an answer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
