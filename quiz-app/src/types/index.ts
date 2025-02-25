export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Quiz = {
  title: string;
  questions: (QuizQuestion & { selection?: string })[];
  completed: boolean;
};

export type QuizData = {
  quizzes: Quiz[];
};

export type ThemeMode = "light" | "dark";

export type QuizCategory = "HTML" | "CSS" | "JavaScript" | "Accessibility";

export type QuizResponse = {
  question: string;
  options: string[];
  answer: string;
  selection: string;
};
