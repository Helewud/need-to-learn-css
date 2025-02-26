import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/core/Button/Button";
import { IconAndNameGroup } from "../../components/core/Icon";
import { GetIconComponentByCategory } from "../../components/core/Icon/Icon";
import { Layout } from "../../components/features/layout";
import { QuizContext } from "../../context/QuizContext";
import { QuizCategory } from "../../types";
import styles from "./Quiz.module.scss";
import { QuizInputGroup } from "./QuizInput";
import { QuizProgressBar } from "./QuizProgressBar";
import { ThemeContext } from "../../context/ThemeContext";

export const QuizReview = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { quiz } = useContext(QuizContext);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz.completed) {
      navigate("/");
    }
  }, [quiz, navigate]);

  if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz?.completed) {
    return;
  }

  const { title: category, questions } = quiz;
  const currentQuestion = questions[questionCount];
  const currentCount = questionCount + 1;
  const totalCount = questions.length;

  const handleNext = () => {
    if (currentCount < totalCount) {
      setQuestionCount((prev) => prev + 1);
      return;
    }

    navigate("/result");
  };

  const handlePrev = () => {
    setQuestionCount((prev) => prev - 1);
    return;
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
        </section>

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
    </Layout>
  );
};
