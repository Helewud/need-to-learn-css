type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Quiz = {
  title: string;
  icon: string;
  questions: QuizQuestion[];
};

export type QuizData = {
  quizzes: Quiz[];
};

export type ThemeMode = "light" | "dark";
