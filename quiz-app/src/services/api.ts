import { QuizData } from "../types";

export const fetchQuiz = async () => {
  const response = await fetch(
    "http://localhost:5173/src/assets/data/data.json"
  );

  if (response.ok) {
    const quizData = (await response.json()) as QuizData;
    return quizData.quizzes;
  }

  console.error(
    "error fetching quiz data",
    response.status,
    response.statusText
  );

  return new Error("unable to fetch quiz data!");
};
