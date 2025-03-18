import { useCallback, useState } from "react";
import { Quiz } from "../Types/Type";

export const DownloadQuestions = (): {
	quizzes: Quiz[];
	setQuestions: React.Dispatch<React.SetStateAction<Quiz[]>>;
	fetchQuizzes: () => void;
} => {
	const [quizzes, setQuestions] = useState<Quiz[]>([]);

	const API_BASE_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/api"
			: "api";

	const fetchQuizzes = useCallback(async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/quizzes`);
			const data: Quiz[] = await response.json();
			setQuestions(data);
		} catch (error) {
			console.error("Error fetching quizzes:", error);
		}
	}, [API_BASE_URL]);

	return { quizzes, setQuestions, fetchQuizzes };
};
