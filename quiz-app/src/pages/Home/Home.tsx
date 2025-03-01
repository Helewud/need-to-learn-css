import { GetIconComponentByCategory } from "../../components/Icon/BoxedIcon";
import { usePageSetup } from "../../hooks/usePageSetup";
import { quizCategories, QuizCategory } from "../../types";
import { Quiz } from "../Quiz";
import styles from "./Home.module.scss";

export const Home = () => {
  const { theme, setPageContent } = usePageSetup();

  const handleQuizCategory = (e: React.MouseEvent) => {
    const target = e.target as HTMLInputElement;

    if (quizCategories.includes(target.value as never)) {
      setPageContent(<Quiz category={target.value} />);
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

      <nav className={styles["category-options"]}>
        <ul className={styles["options-group"]}>
          {quizCategories.map((title, index) => {
            const icon = GetIconComponentByCategory(title as QuizCategory);
            return (
              <li key={index} data-category={title}>
                <label className={styles[`select-input-${theme}`]}>
                  <input
                    type="radio"
                    id={`category-${title}`}
                    name="category-selection"
                    value={title}
                    onClick={handleQuizCategory}
                    style={{ display: "none" }}
                  />
                  {icon}
                  <span>{title}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
