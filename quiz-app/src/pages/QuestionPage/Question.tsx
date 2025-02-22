import { QuizProgressBar } from "../../components/features/quiz";
import { QuizSelectButton } from "../../components/features/quiz/QuizSelectButton";
import { Button } from "../../components/core/Button/Button";
import { Layout } from "../../components/features/layout";
import styles from "./Question.module.scss";
import { IconAndNameGroup } from "../../components/core/Icon";
import JsIcon from "../../components/core/Icon/JsIcon";

export const Question = () => {
  const cateogory = (
    <IconAndNameGroup name="JavaScript">
      <JsIcon />
    </IconAndNameGroup>
  );

  return (
    <Layout category={cateogory}>
      <div className={styles["content"]}>
        <section className={styles["question-content"]}>
          <div className={styles["text-area"]}>
            <p>Question 6 of 10</p>
            <h2>
              Which of these color contrast ratios defines the minimum WCAG 2.1
              Level AA requirement for normal text?
            </h2>
          </div>
        </section>

        <QuizProgressBar />

        <div className={styles["question-options"]}>
          <QuizSelectButton option="A" text="Call me now now now" />
          <QuizSelectButton option="A" text="Call me now now now" />
          <QuizSelectButton option="A" text="Call me now now now" />
          <QuizSelectButton option="A" text="Call me now now now" />
          <Button text="Submit Answer" />
        </div>
      </div>
    </Layout>
  );
};
