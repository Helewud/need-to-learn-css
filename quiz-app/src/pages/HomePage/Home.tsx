import { useEffect, useState } from "react";
import {
  AccessibilityIcon,
  CssIcon,
  HtmlIcon,
  JsIcon,
} from "../../components/core/Icon";
import HomeSelectButton from "../../components/features/home/HomeSelectButton";
import Layout from "../../components/features/layout/Layout";
import { fetchQuiz } from "../../services/api";
import { Quiz } from "../../types";
import styles from "./Home.module.scss";

export const Home = () => {
  const [quizMap, setQuizMap] = useState<Map<string, Quiz>>(() => {
    const saved = window.localStorage.getItem("quiz");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    (async function () {
      const q = await fetchQuiz();

      if (q instanceof Error) {
        return;
      }

      const newQuizMap = new Map<string, Quiz>();
      q.every((qu) => newQuizMap.set(qu.title, qu));

      if (newQuizMap.size) {
        window.localStorage.setItem("quiz", JSON.stringify(newQuizMap));
        setQuizMap(newQuizMap);
      }
    })();
  }, []);

  const quizCategories: string[] = [];

  if (quizMap?.size) {
    for (const key of quizMap.keys()) {
      quizCategories.push(key);
    }
  }

  return (
    <Layout>
      <div className={styles["content"]}>
        <section className={styles["header"]}>
          <h2>
            <span className={styles["minor-header"]}>Welcome to the</span>
            <span className={styles["major-header"]}>Frontend Quiz!</span>
          </h2>
          <p>Pick a subject to get started.</p>
        </section>

        <div className={styles["category-options"]}>
          {quizCategories.map((category, index) => {
            const icon = getQuizCategoryIconComponent(category as never);
            return (
              <HomeSelectButton key={index} text={category} children={icon} />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

type QuizCategory = "HTML" | "CSS" | "JavaScript" | "Accessibility";

const getQuizCategoryIconComponent = (category: QuizCategory) => {
  switch (category) {
    case "HTML":
      return <HtmlIcon />;

    case "CSS":
      return <CssIcon />;

    case "JavaScript":
      return <JsIcon />;

    case "Accessibility":
      return <AccessibilityIcon />;
  }
};
