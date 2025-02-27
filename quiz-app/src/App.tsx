import { useState } from "react";
import styles from "./assets/styles/Global.module.scss";
import { IconAndNameGroup } from "./components/core/Icon";
import { GetIconComponentByCategory } from "./components/core/Icon/Icon";
import Layout from "./components/features/layout/Layout";
import { PageContentContext } from "./context/PageContentContext";
import { QuizProvider } from "./context/QuizContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Home } from "./pages/HomePage";
import { IQuiz, QuizCategory } from "./types";
import { useLocalStorage } from "./hooks";

const App = () => {
  const [quiz, setQuiz] = useState<IQuiz>();
  const [pageContent, setPageContent] = useState(<Home />);
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const category = quiz?.title;

  const handleHeader = () => {
    const icon = GetIconComponentByCategory(category as QuizCategory);
    return <IconAndNameGroup name={category!}>{icon}</IconAndNameGroup>;
  };

  return (
    <PageContentContext value={{ pageContent, setPageContent }}>
      <ThemeProvider value={{ theme, setTheme }}>
        <QuizProvider value={{ quiz, setQuiz }}>
          <main className={styles[`${theme}-theme`]}>
            <Layout category={handleHeader()}>{pageContent}</Layout>
          </main>
        </QuizProvider>
      </ThemeProvider>
    </PageContentContext>
  );
};

export default App;
