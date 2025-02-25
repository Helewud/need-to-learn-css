import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/core/Button/Button";
import { IconAndNameGroup } from "../../components/core/Icon";
import { GetIconComponentByCategory } from "../../components/core/Icon/Icon";
import { Layout } from "../../components/features/layout";
import { QuizProgressBar } from "../../components/features/quiz";
import { QuizSelectButton } from "../../components/features/quiz/QuizSelectButton";
import { QuizContext } from "../../context/QuizContext";
import { QuizCategory } from "../../types";
import styles from "./Question.module.scss";

export const Question = () => {
  const navigate = useNavigate();
  const { quiz } = useContext(QuizContext);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length) {
      navigate("/");
      return;
    }
  }, [quiz, navigate]);

  if (!quiz || !quiz.title || !quiz?.questions?.length) {
    return;
  }

  const category = quiz.title;
  const questions = quiz.questions;
  const currentCount = questionCount + 1;
  const totalCount = questions.length;
  const currentQuestion = questions[questionCount];

  const handleNextQuestion = (e: React.MouseEvent) => {
    if (!currentQuestion.selection) {
      console.log("an option is needed");
      e.preventDefault();
      return;
    }

    if (currentCount < totalCount) {
      setQuestionCount((prev) => prev + 1);
    } else {
      navigate("/result");
    }
  };

  const handleOptionSelection = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    currentQuestion.selection = target.value;
  };

  const icon = GetIconComponentByCategory(category as QuizCategory);
  const iconGroup = <IconAndNameGroup name={category}>{icon}</IconAndNameGroup>;

  return (
    <Layout category={iconGroup}>
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

        <div className={styles["question-options"]}>
          {currentQuestion.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            return (
              <QuizSelectButton
                key={option}
                option={optionLetter}
                text={option}
                clickAction={handleOptionSelection}
              />
            );
          })}
          <Button
            text={currentCount === totalCount ? "Finish Quiz" : "Next Question"}
            clickAction={handleNextQuestion}
          />
        </div>
      </div>
    </Layout>
  );
};
