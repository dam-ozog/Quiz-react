import { Link } from "react-router-dom";
import { DownloadQuestions } from "../DownloadAPIHook/DowloadQuestions";
import { Quiz } from "../Types/Type";
import { useEffect, useState } from "react";

const QuizList = () => {
	const { quizzes, fetchQuizzes } = DownloadQuestions();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadQuizes = async () => {
			setIsLoading(true);
			try {
				await fetchQuizzes();
			} catch (error) {
				console.error("Błąd podaczas pobierania quizów", error);
			} finally {
				setIsLoading(false);
			}
		};
		loadQuizes();
	}, [fetchQuizzes]);

	if (isLoading) {
		return (
			<div className='text-center'>
				<span className='loading loading-dots loading-lg'></span>
				<p>Ładowanie Quizów</p>
			</div>
		);
	}
	return (
		<div className='text-center'>
			<ul>
				{quizzes.map((quiz: Quiz, index) => (
					<li key={quiz._id || index}>
						<Link to={`/${quiz._id}`}>{quiz.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default QuizList;
