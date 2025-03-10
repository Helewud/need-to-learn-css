import { createContext, ReactElement } from "react";
import { IQuiz } from "../types";

interface QuizContextProps {
  quiz?: IQuiz;
  setQuiz: React.Dispatch<IQuiz>;
}

interface QuizProviderProps {
  children: ReactElement;
  value: QuizContextProps;
}

export const QuizContext = createContext<QuizContextProps>({
  quiz: undefined,
  setQuiz: () => null,
});

export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  value: { quiz, setQuiz },
}) => {
  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
