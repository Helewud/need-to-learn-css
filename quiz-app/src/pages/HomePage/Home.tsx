import { useContext, useEffect, useState } from "react";
import { GetIconComponentByCategory } from "../../components/core/Icon/Icon";
import { PageContentContext } from "../../context/PageContentContext";
import { QuizContext } from "../../context/QuizContext";
import { ThemeContext } from "../../context/ThemeContext";
import { fetchQuiz } from "../../services/api";
import { IQuiz, QuizCategory } from "../../types";
import { Quiz } from "../QuizPage/Quiz";
import styles from "./Home.module.scss";

export const Home = () => {
  const { setPageContent } = useContext(PageContentContext);
  const { setQuiz } = useContext(QuizContext);
  const { theme } = useContext(ThemeContext);
  const [quizData, setQuizData] = useState<IQuiz[]>();

  useEffect(() => {
    (async () => {
      const resp = await fetchQuiz();
      if (resp instanceof Error) return;

      setQuizData(resp);
    })();
  }, []);

  if (!quizData) return;

  const handleQuizCategory = (e: React.MouseEvent) => {
    const target = e.target as HTMLInputElement;
    const quiz = quizData.find((q) => q.title === target.value);
    if (quiz) {
      quiz.completed = false;
      setQuiz(quiz);
      setPageContent(<Quiz />);
    }
  };

  return (
    <div className={styles.content}>
      <section className={styles.header}>
        <h2>
          <span className={styles["minor-header"]}>Welcome to the</span>
          <span className={styles["major-header"]}>Frontend Quiz!</span>
        </h2>
        <p className={styles[theme + "-theme"]}>
          Pick a subject to get started.
        </p>
      </section>

      <fieldset className={styles["category-options"]} role="navigation">
        {quizData.map(({ title }, index) => {
          const icon = GetIconComponentByCategory(title as QuizCategory);
          return (
            <label className={styles[`select-input-${theme}`]} key={index}>
              <input
                key={index}
                type="radio"
                id={`category-${title}`}
                name="category-selection"
                value={title}
                onClick={handleQuizCategory}
              />
              {icon}
              <p>{title}</p>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};
