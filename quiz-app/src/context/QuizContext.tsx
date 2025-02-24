/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactElement } from "react";
import { QuizQuestion } from "../types";

/**
 *
 *
 *
 *
 *
 *
 *
 */

interface QuizCategoryContextProps {
  category: string;
  setCategory: React.Dispatch<string>;
}

interface QuizCategoryProviderProps {
  children: ReactElement;
  value: QuizCategoryContextProps;
}

export const QuizCategoryContext = createContext<QuizCategoryContextProps>({
  category: "",
  setCategory: () => null,
});

export const QuizCategoryProvider: React.FC<QuizCategoryProviderProps> = ({
  children,
  value: { category, setCategory },
}) => {
  return (
    <QuizCategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </QuizCategoryContext.Provider>
  );
};

/**
 *
 *
 *
 *
 *
 *
 *
 */

interface QuizQuestionsContextProps {
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<QuizQuestion[]>;
}

interface QuizQuestionsProviderProps {
  children: ReactElement;
  value: QuizQuestionsContextProps;
}

export const QuizQuestionsContext = createContext<QuizQuestionsContextProps>({
  questions: [],
  setQuestions: () => null,
});

export const QuizQuestionsProvider: React.FC<QuizQuestionsProviderProps> = ({
  children,
  value: { questions, setQuestions },
}) => {
  return (
    <QuizQuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuizQuestionsContext.Provider>
  );
};
