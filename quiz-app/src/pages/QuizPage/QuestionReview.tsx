import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/core/Button/Button";
import { PageContentContext } from "../../context/PageContentContext";
import { QuizContext } from "../../context/QuizContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Home } from "../HomePage";
import { Result } from "../ResultPage";
import styles from "./Quiz.module.scss";
import { QuizInputGroup } from "./QuizInput";
import { QuizProgressBar } from "./QuizProgressBar";

export const QuizReview = () => {
  const { setPageContent } = useContext(PageContentContext);
  const { theme } = useContext(ThemeContext);
  const { quiz } = useContext(QuizContext);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz.completed) {
      setPageContent(<Home />);
    }
  }, [quiz, setPageContent]);

  if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz?.completed) {
    return;
  }

  const { questions } = quiz;
  const currentQuestion = questions[questionCount];
  const currentCount = questionCount + 1;
  const totalCount = questions.length;

  const handleNext = () => {
    if (currentCount < totalCount) {
      setQuestionCount((prev) => prev + 1);
      return;
    }

    setPageContent(<Result />);
  };

  const handlePrev = () => {
    setQuestionCount((prev) => prev - 1);
    return;
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
