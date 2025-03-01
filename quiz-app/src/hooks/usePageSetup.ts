import { useContext } from "react";
import { PageContentContext } from "../context/PageContentContext";
import { QuizContext } from "../context/QuizContext";
import { ThemeContext } from "../context/ThemeContext";

export const usePageSetup = () => {
  const { setPageContent } = useContext(PageContentContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { quiz, setQuiz } = useContext(QuizContext);

  return { theme, setTheme, quiz, setQuiz, setPageContent };
};
