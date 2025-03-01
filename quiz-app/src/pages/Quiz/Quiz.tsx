import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import { IncorrectIcon } from "../../components/Icon/Icon";
import LoadingOverlay from "../../components/Layout/Loading";
import { usePageSetup } from "../../hooks/usePageSetup";
import { useQuizGenerator } from "../../hooks/useQuizGenerator";
import { Home } from "../Home";
import { Result } from "../Result";
import styles from "./Quiz.module.scss";
import { QuizInputGroup } from "./QuizInput";
import { QuizProgressBar } from "./QuizProgressBar";

export const Quiz = ({ category }: { category: string }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const optionSelectionRef = useRef<HTMLDivElement>(null);
  const { theme, quiz, setQuiz, setPageContent } = usePageSetup();
  const { error } = useQuizGenerator(category, setIsLoading, setQuiz);

  useEffect(() => {
    if (error) {
      setPageContent(<Home />);
      console.log(error);
      return;
    }
  }, [error, setPageContent]);

  if (isLoading) {
    return (
      <LoadingOverlay theme={theme} content={"Setting Up Quiz Environment"} />
    );
  }

  if (!quiz) return;

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
      quiz!.completed = true;
      setPageContent(<Result />);
    }

    return;
  };

  const handleInputSelection = (e: React.MouseEvent) => {
    setHasError(false);
    resetInputActiveState();

    const target = e.currentTarget as HTMLInputElement;
    if (target) currentQuestion.selection = target.value!;

    const inputLabel = target.parentElement!;
    if (inputLabel) inputLabel.classList.add(styles["active"]);
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
          <Button
            text={currentCount === totalCount ? "Finish Quiz" : "Next Question"}
            clickAction={handleNext}
          />

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
