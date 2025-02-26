import { useContext, useEffect } from "react";
import { Button } from "../../components/core/Button";
import { IconAndNameGroup } from "../../components/core/Icon";
import { GetIconComponentByCategory } from "../../components/core/Icon/Icon";
import { PageContentContext } from "../../context/PageContentContext";
import { QuizContext } from "../../context/QuizContext";
import { QuizCategory } from "../../types";
import { Home } from "../HomePage";
import { QuizReview } from "../QuizPage/QuestionReview";
import styles from "./Result.module.scss";
import { ScoreCard } from "./ScoreCard";

export const Result = () => {
  const { setPageContent } = useContext(PageContentContext);
  const { quiz } = useContext(QuizContext);

  useEffect(() => {
    if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz.completed) {
      setPageContent(<Home />);
    }
  }, [quiz, setPageContent]);

  if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz.completed) {
    return;
  }

  const category = quiz.title;
  const questions = quiz.questions;
  let correctCount = 0;
  const totalCount = quiz.questions.length;

  questions?.forEach((q) => q.answer === q.selection && correctCount++);
  const routeHome = () => setPageContent(<Home />);
  const routeReview = () => setPageContent(<QuizReview />);
  const icon = GetIconComponentByCategory(category as QuizCategory);
  const iconGroup = <IconAndNameGroup name={category}>{icon}</IconAndNameGroup>;

  return (
    <div className={styles["content"]}>
      <h2 className={styles["header"]}>
        <span className={styles["minor-header"]}>Quiz Completed</span>
        <span className={styles["major-header"]}>You scored...</span>
      </h2>

      <div className={styles["score-content"]}>
        <ScoreCard correctCount={correctCount} totalCount={totalCount}>
          {iconGroup}
        </ScoreCard>

        <Button clickAction={routeHome} text="Play Again" />
        <Button clickAction={routeReview} text="Review Solution" />
      </div>
    </div>
  );
};
