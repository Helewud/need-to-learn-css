import { useState } from "react";
import { Route, Routes } from "react-router";
import styles from "./assets/styles/Global.module.scss";
import { QuizProvider } from "./context/QuizContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Home } from "./pages/HomePage";
import { QuizReview } from "./pages/QuizPage/QuestionReview";
import { Quiz } from "./pages/QuizPage/Quiz";
import { Score } from "./pages/ScorePage";
import { IQuiz, ThemeMode } from "./types";

const App = () => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [quiz, setQuiz] = useState<IQuiz>();

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <QuizProvider value={{ quiz, setQuiz }}>
        <main className={styles[`${theme}-theme`]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question" element={<Quiz />} />
            <Route path="/result" element={<Score />} />
            <Route path="/review" element={<QuizReview />} />
          </Routes>
        </main>
      </QuizProvider>
    </ThemeProvider>
  );
};

export default App;
