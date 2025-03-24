import { useCallback, useState } from "react";
import { Quiz } from "../../Types/Type";
import { API_BASE_URL } from "../../constants/apiBaseUrl";

export const DownloadQuestions = (): {
	quizzes: Quiz[];
	// setQuestions: React.Dispatch<React.SetStateAction<Quiz[]>>;
	fetchQuizzes: () => void;
} => {
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);

	const fetchQuizzes = useCallback(async () => {
		fetch(`${API_BASE_URL}/quizzes`)
			.then(res => res.json())
			.then(data => setQuizzes(data))
			.catch(error => {
				console.error("Error fetching quizzes:", error);
			});
	}, []);

	return { quizzes, fetchQuizzes };
};
