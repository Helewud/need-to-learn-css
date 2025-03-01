import { useEffect } from "react";
import { Button } from "../../components/Button";
import { HeaderIcon } from "../../components/Icon/HeaderIcon";
import { usePageSetup } from "../../hooks/usePageSetup";
import { Home } from "../Home";
import { QuizReview } from "../Quiz";
import styles from "./Result.module.scss";
import { ScoreCard } from "./ScoreCard";

export const Result = () => {
  const { quiz, setPageContent } = usePageSetup();

  useEffect(() => {
    if (!quiz) {
      setPageContent(<Home />);
      return;
    }
  }, [quiz, setPageContent]);

  if (!quiz) return;

  const category = quiz.title;
  const questions = quiz.questions;
  const totalCount = quiz.questions.length;
  let correctCount = 0;

  questions?.forEach((q) => q.answer === q.selection && correctCount++);
  const routeHome = () => setPageContent(<Home />);
  const routeReview = () => setPageContent(<QuizReview />);

  return (
    <div className={styles["content"]}>
      <h2 className={styles["header"]}>
        <span className={styles["minor-header"]}>Quiz Completed</span>
        <span className={styles["major-header"]}>You scored...</span>
      </h2>

      <div className={styles["score-content"]}>
        <ScoreCard correctCount={correctCount} totalCount={totalCount}>
          {<HeaderIcon category={category as never} />}
        </ScoreCard>

        <Button clickAction={routeHome} text="Play Again" />
        <Button clickAction={routeReview} text="Review Solution" />
      </div>
    </div>
  );
};
