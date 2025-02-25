export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type IQuiz = {
  title: string;
  questions: (QuizQuestion & { selection?: string })[];
  completed: boolean;
};

export type QuizData = {
  quizzes: IQuiz[];
};

export type ThemeMode = "light" | "dark";

export type QuizCategory = "HTML" | "CSS" | "JavaScript" | "Accessibility";

export type QuizResponse = {
  question: string;
  options: string[];
  answer: string;
  selection: string;
};
