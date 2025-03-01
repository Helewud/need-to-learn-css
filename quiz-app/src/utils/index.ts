import { IQuiz } from "../types";

export const validateQuiz = (quiz: IQuiz | null | undefined) => {
  if (!quiz || !quiz.title || !quiz?.questions?.length || !quiz?.completed) {
    return false;
  }

  return true;
};
