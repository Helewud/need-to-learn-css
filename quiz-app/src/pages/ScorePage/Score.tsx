import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/core/Button";
import { IconAndNameGroup } from "../../components/core/Icon";
import { GetIconComponentByCategory } from "../../components/core/Icon/Icon";
import { Layout } from "../../components/features/layout";
import { ScoreCard } from "../../components/features/score/ScoreCard";
import { QuizContext } from "../../context/QuizContext";
import { QuizCategory } from "../../types";
import styles from "./Score.module.scss";

export const Score = () => {
  const navigate = useNavigate();
  const { quiz } = useContext(QuizContext);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz.completed) {
      navigate("/");
      return;
    }
  }, [quiz, navigate]);

  if (!quiz || !quiz.title || !quiz?.questions?.length) {
    return;
  }

  const category = quiz.title;
  const questions = quiz.questions;
  let correctCount = 0;
  const totalCount = quiz.questions.length;

  questions?.forEach((q) => q.answer === q.selection && correctCount++);

  const handleRetryQuiz = () => {
    navigate("/");
  };

  const handleReviewQuiz = () => {
    navigate("/review");
  };

  const icon = GetIconComponentByCategory(category as QuizCategory);

  const iconGroup = <IconAndNameGroup name={category}>{icon}</IconAndNameGroup>;

  return (
    <Layout category={iconGroup}>
      <div className={styles["content"]}>
        <h2 className={styles["header"]}>
          <span className={styles["minor-header"]}>Quiz Completed</span>
          <span className={styles["major-header"]}>You scored...</span>
        </h2>

        <div className={styles["score-content"]}>
          <ScoreCard correctCount={correctCount} totalCount={totalCount}>
            {iconGroup}
          </ScoreCard>

          <Button clickAction={handleRetryQuiz} text="Play Again" />
          <Button clickAction={handleReviewQuiz} text="Review Solution" />
        </div>
      </div>
    </Layout>
  );
};
