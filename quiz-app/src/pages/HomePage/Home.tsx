import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GetIconComponentByCategory } from "../../components/core/Icon/Icon";
import HomeSelectButton from "../../components/features/home/HomeSelectButton";
import Layout from "../../components/features/layout/Layout";
import { QuizContext } from "../../context/QuizContext";
import { fetchQuiz } from "../../services/api";
import { Quiz, QuizCategory } from "../../types";
import styles from "./Home.module.scss";

export const Home = () => {
  const navigate = useNavigate();
  const { setQuiz } = useContext(QuizContext);
  const [quizData, setQuizData] = useState<Quiz[]>();

  useEffect(() => {
    (async () => {
      const resp = await fetchQuiz();
      if (resp instanceof Error) return;

      setQuizData(resp);
    })();
  }, []);

  if (!quizData) return;

  const handleQuizCategory = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    const quiz = quizData.find((q) => q.title === target.value);
    if (quiz) {
      quiz.completed = false;
      setQuiz(quiz);
      navigate("/question");
    }
  };

  return (
    <Layout>
      <div className={styles.content}>
        <section className={styles.header}>
          <h2>
            <span className={styles["minor-header"]}>Welcome to the</span>
            <span className={styles["major-header"]}>Frontend Quiz!</span>
          </h2>
          <p>Pick a subject to get started.</p>
        </section>

        <div className={styles["category-options"]}>
          {quizData.map(({ title }, index) => {
            const icon = GetIconComponentByCategory(title as QuizCategory);
            return (
              <HomeSelectButton
                key={index}
                category={title}
                clickAction={handleQuizCategory}
              >
                {icon}
              </HomeSelectButton>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
