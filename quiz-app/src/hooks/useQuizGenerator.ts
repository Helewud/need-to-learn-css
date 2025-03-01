import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCallback, useEffect, useState } from "react";
import { IQuiz } from "../types";

const { VITE_GEMINI_API_KEY } = import.meta.env;

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  title: string;
  questions: Question[];
}

function parseQuizJson(jsonString: string): QuizData | null {
  try {
    const cleanedString = jsonString.replace(/```(json)?\n?|```/g, "");
    const parsedData: unknown = JSON.parse(cleanedString);

    if (typeof parsedData === "object" && parsedData !== null) {
      const data = parsedData as Record<string, unknown>;
      if (
        typeof data.title === "string" &&
        Array.isArray(data.questions) &&
        data.questions.every(
          (q: unknown) =>
            typeof q === "object" &&
            q !== null &&
            "question" in q &&
            "options" in q &&
            "answer" in q
        )
      ) {
        return parsedData as QuizData;
      }
    }
    throw new Error("Invalid quiz data structure");
  } catch (error) {
    console.error("Error parsing quiz JSON:", error);
    return null;
  }
}

const useQuizPrompt = () => {
  return useCallback((category: string) => {
    const schema = {
      title: category,
      questions: [
        {
          question: "clear question phrasing",
          options: [
            "short option",
            "short option",
            "short option",
            "short option",
          ],
          answer: "exact correct option text",
        },
      ],
    };

    return `
    Generate an array of 10 unique multiple-choice quiz questions in JSON format about ${category}. Follow these requirements and output the JSON object directly.

    JSON Schema:
      ${JSON.stringify(schema, null, 2)}

    Content Rules:

    Questions
      Length: 10-30 words (mix short/long phrasing)
      Types: 40% theoretical concepts, 30% design analysis, 30% real-world application
      Difficulty: 20% beginner, 40% intermediate, 40% advanced
      Sources: Incorporate patterns from StackOverflow/Reddit discussions (2017-2024)
    
    Options
      Maximum of 60 characters including spaces per option
      Include 1 plausible trap (common misconception)
      Include 1 syntax distractor (valid but wrong context)
      Final option: Wildcard (non-obvious edge case)
      Options should be concise but can be a bit lengthy to match the difficulty of the question
      Avoid 'all/none of the above' options
      Ensure only one correct answer per question

    Originality
      No duplicates from prior generations (cross-check last 5 outputs)
      Prioritize under-discussed sections/features
      Include 2 questions about recent features/developments
      Ensure no duplicated concepts/questions

    Validation Protocol
      Each question must be factually accurate and verifiable
      Confirm answer uniqueness via truth tables
      Ensure no semantic overlap
      Double-check technical accuracy
      Verify answer matches exactly one option

    Output only the JSON object, do not add any additional text or code blocks.`;
  }, []);
};

export function useQuizGenerator(
  category: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setQuiz: React.Dispatch<IQuiz>
) {
  const [error, setError] = useState<string | null>(null);
  const generatePrompt = useQuizPrompt();

  const fetchQuiz = useCallback(
    async (signal: AbortSignal) => {
      setError(null);

      try {
        const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel(
          { model: "gemini-2.0-flash" },
          { timeout: 60000 }
        );

        const result = await model.generateContent(generatePrompt(category), {
          signal,
        });

        const parsedData = parseQuizJson(result.response.text());
        if (!parsedData) {
          throw new Error("Failed to parse quiz data");
        }

        setQuiz({
          title: parsedData.title,
          questions: parsedData.questions,
          completed: false,
        });
      } catch (err) {
        const e = err as Error;
        if (e.name !== "AbortError") {
          setError(e.message || "Failed to load quiz");
          console.error("Quiz generation error:", e);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [category, generatePrompt, setIsLoading, setQuiz]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchQuiz(abortController.signal);

    return () => abortController.abort();
  }, [fetchQuiz]);

  return {
    error,
  };
}
