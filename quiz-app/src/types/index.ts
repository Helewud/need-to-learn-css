export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  selection?: string;
};

export type IQuiz = {
  title: string;
  questions: QuizQuestion[];
  completed: boolean;
};

export type QuizData = {
  quizzes: IQuiz[];
};

export type ThemeMode = "light" | "dark";

export type QuizResponse = {
  question: string;
  options: string[];
  answer: string;
  selection: string;
};

export type QuizCategory =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "Accessibility"
  | "System Design"
  | "DevOps"
  | "ML"
  | "API"
  | "Database"
  | "Cloud"
  | "Go"
  | "Python";

export const quizCategories: QuizCategory[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "Accessibility",
  "System Design",
  "DevOps",
  "ML",
  "API",
  "Database",
  "Cloud",
  "Go",
  "Python",
];
