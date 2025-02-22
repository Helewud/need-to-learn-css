import { IconAndNameGroup, JsIcon } from "../../components/core/Icon";
import { Layout } from "../../components/features/layout";
import styles from "./Score.module.scss";
import { ScoreCard } from "../../components/features/score/ScoreCard";
import { Button } from "../../components/core/Button";

export const Score = () => {
  const cateogory = (
    <IconAndNameGroup name="JavaScript">
      <JsIcon />
    </IconAndNameGroup>
  );

  return (
    <Layout category={cateogory}>
      <div className={styles["content"]}>
        <h2 className={styles["header"]}>
          <span className={styles["minor-header"]}>Quiz Completed</span>
          <span className={styles["major-header"]}>You scored...</span>
        </h2>

        <div className={styles["score-content"]}>
          <ScoreCard correctCount={8} totalCount={20}>
            {cateogory}
          </ScoreCard>

          <Button text="Play Again" />
        </div>
      </div>
    </Layout>
  );
};
