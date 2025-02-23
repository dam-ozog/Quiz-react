import { Link } from "react-router-dom";
import { DownloadQuestions } from "../DownloadAPIHook/DowloadQuestions";
import { Quiz } from "../Types/Type";
import { useEffect, useState } from "react";

const WhichQuiz = () => {
	const { questions: quizzes, fetchQuestions } = DownloadQuestions();
	const [quizList, setQuizList] = useState<Quiz[]>([]);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	useEffect(() => {
		setQuizList(quizzes);
	}, [quizzes]);
	return (
		<div className='text-center'>
            <ul>
			{quizzes.map((quiz: Quiz, index) => (
					<li key={quiz.id || index}>
						<Link to={`/${quiz.id}`}>
							{quiz.title}
						</Link>
					</li>
			))}
            </ul>
		</div>
	);
};

export default WhichQuiz;
