import { useState } from "react";
import styles from "./assets/styles/Global.module.scss";
import Layout from "./components/Layout/Layout";
import { PageContentContext } from "./context/PageContentContext";
import { QuizProvider } from "./context/QuizContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Home } from "./pages/Home";
import { IQuiz } from "./types";

const App = () => {
  const [quiz, setQuiz] = useState<IQuiz>();
  const [pageContent, setPageContent] = useState(() => <Home />);
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <PageContentContext value={{ pageContent, setPageContent }}>
        <QuizProvider value={{ quiz, setQuiz }}>
          <main className={styles[`${theme}-theme`]}>
            <Layout category={quiz?.title as never}>{pageContent}</Layout>
          </main>
        </QuizProvider>
      </PageContentContext>
    </ThemeProvider>
  );
};

export default App;
