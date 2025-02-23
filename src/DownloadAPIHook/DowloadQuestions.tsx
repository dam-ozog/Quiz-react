import { useCallback, useState } from "react";
import { Question, Quiz } from "../Types/Type";

export const DownloadQuestions = (): {
	questions: Quiz[];
    setQuestions: React.Dispatch<React.SetStateAction<Quiz[]>>;
	fetchQuestions: () => void;
} => {
	const [questions, setQuestions] = useState<Quiz[]>([]);

	const API_BASE_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/api"
			: "api";

	const fetchQuestions = useCallback(async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/questions`);
			const data: Quiz[] = await response.json();
			setQuestions(data);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	}, [API_BASE_URL]);

	return { questions, setQuestions, fetchQuestions };
};
