import { Link } from "react-router-dom";
import { DownloadQuestions } from "../../services/DownloadQuestion/DowloadQuestions";
import { Quiz } from "../../Types/Type";
import { Suspense, useEffect, useState } from "react";

const QuizList = () => {
	const { quizzes, fetchQuizzes } = DownloadQuestions();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true)
		fetchQuizzes()
			.then(() => setIsLoading(false))
			.catch(error => {
				console.error("Błąd pobierania quizów", error);
				setIsLoading(false);
			});
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
				{Array.isArray(quizzes) ? (
					quizzes.map((quiz: Quiz, index) => (
						<li key={quiz._id || index}>
							<Link to={`/${quiz._id}`}>{quiz.title}</Link>
						</li>
					))
				) : (
					<span>Brak quizów do wyświetlenia.</span>
				)}
			</ul>
		</div>
	);
};

export default QuizList
