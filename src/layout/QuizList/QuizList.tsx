import { Link } from "react-router-dom";
import { DownloadQuestions } from "../../services/DownloadQuestion/DowloadQuestions";
import { Quiz } from "../../Types/Type";
import {  useEffect, useState } from "react";
// import QuizLogo from "/assets/quiz.svg?react";


const QuizList = () => {
	const { quizzes, fetchQuizzes } = DownloadQuestions();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
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
		<div className='mt-[40px]'>
			<ul className='flex justify-center gap-[30px]'>
				{Array.isArray(quizzes) &&
					quizzes.map((quiz: Quiz, index) => (
						<Link key={quiz._id || index} to={`/${quiz._id}`}>
							<li className='mb-[10px] text-[17px] flex flex-col items-center'>
								{quiz.title}
								<img src="/assets/quiz.svg" alt="QuizLogo" className="w-[100px] h-[100px]"/>
							</li>
						</Link>
					))
}
			</ul>
		</div>
	);
};

export default QuizList;
