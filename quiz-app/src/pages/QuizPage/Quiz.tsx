import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/core/Button/Button";
import { IconAndNameGroup } from "../../components/core/Icon";
import {
  GetIconComponentByCategory,
  IncorrectIcon,
} from "../../components/core/Icon/Icon";
import { Layout } from "../../components/features/layout";
import { QuizContext } from "../../context/QuizContext";
import { QuizCategory } from "../../types";
import styles from "./Quiz.module.scss";
import { QuizInputGroup } from "./QuizInput";
import { QuizProgressBar } from "./QuizProgressBar";

export const Quiz = () => {
  const navigate = useNavigate();
  const { quiz } = useContext(QuizContext);
  const [questionCount, setQuestionCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const optionSelectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length || quiz.completed) {
      navigate("/");
    }
  }, [quiz, navigate]);

  if (!quiz || !quiz.title || !quiz?.questions?.length) return;

  const { title: category, questions } = quiz;
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
      return navigate("/result");
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

  const handleHeader = () => {
    const icon = GetIconComponentByCategory(category as QuizCategory);
    return <IconAndNameGroup name={category}>{icon}</IconAndNameGroup>;
  };

  return (
    <Layout category={handleHeader()}>
      <div className={styles.content}>
        <section className={styles["question-content"]}>
          <div className={styles["p-bar"]}>
            <QuizProgressBar progress={(currentCount / totalCount) * 100} />
          </div>

          <div className={styles["text-area"]}>
            <p>
              Question {currentCount} of {totalCount}
            </p>
            <h2>{currentQuestion.question}</h2>
          </div>
        </section>

        <div ref={optionSelectionRef} className={styles["options-selection"]}>
          {
            <QuizInputGroup
              options={currentQuestion.options}
              clickAction={handleInputSelection}
            />
          }

          <div className={styles["options-submission"]}>
            {/* Option selection input group, options A,B,C,D */}
            <Button
              text={
                currentCount === totalCount ? "Finish Quiz" : "Next Question"
              }
              clickAction={handleNext}
            />

            {/* Validation error message */}
            {hasError && (
              <div className={styles["validation-message"]}>
                <IncorrectIcon />
                <p>Please select an answer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
