import { useEffect, useState } from "react";
import AddQuestion from "../components/AddQuestion/AddQuestion";
import { ReapetQuizButton } from "../components/ReapetQuizButton/ReapetQuizButton";
import { NextorFinishButton } from "../components/NextorFinishButton/NextorFinishButton";
import { DeleteQuestion } from "../components/DeleteQuestion/DeleteQuestion";
import { DownloadQuestions } from "../DownloadAPIHook/DowloadQuestions";
import { ReturnButton } from "../components/ReturnButton/ReturnButton";
import { CurrentReviewQuestion } from "../components/CurrentReviewQuestion/CurrentReviewQuestions";
import { QuizQuestion } from "../Types/Type";
import { useParams } from "react-router-dom";
import { QuizResult } from "../components/QuizResult/QuizResult";
import {
	checkAnswer,
	resetAnswers,
	updateSelectedAnswer,
} from "../quizHelper/quizHelper";

export const QuizApp = () => {
	const { quizzes, fetchQuizzes } = DownloadQuestions();
	const { id } = useParams();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
	const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
	const [quizName, setQuizName] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchQuizzes();
	}, [fetchQuizzes]);

	useEffect(() => {
		setIsLoading(true);
		if (id) {
			const foundQuiz = quizzes.find(quiz => quiz._id === id);
			if (foundQuiz) {
				setQuizQuestions(foundQuiz.questions);
				setCurrentQuestionIndex(0);
				setQuizCompleted(false);
				setScore(0);
				setQuizName(foundQuiz.title);
				setIsLoading(false);
			}
		}
	}, [id, quizzes]);

	const currentQuestion: QuizQuestion = quizQuestions[currentQuestionIndex]; //odczytujemy aktualne pytanie

	const handleAnsweredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuizQuestions(
			updateSelectedAnswer(quizQuestions, currentQuestion._id, e.target.value)
		);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setScore(checkAnswer(quizQuestions));
			setQuizCompleted(true);
			setCurrentQuestionIndex(0);
		}
	};

	const handleRepeatQuiz = () => {
		setCurrentQuestionIndex(0);
		setQuizCompleted(false);
		setScore(0);
		setQuizQuestions(resetAnswers(quizQuestions));
	};

	const handleReturnToBackAnswer = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);
	};

	if (isLoading) {
		return (
			<div className='text-center'>
				<p>Ładowanie pytań</p>
				<span className='loading loading-bars loading-lg'></span>
			</div>
		);
	}
	return (
		<div className='text-center m-auto p-[2rem] italic text-[20px]'>
			<h1 className='p-[1rem] text-[34px]'>{quizName}</h1>

			<CurrentReviewQuestion
				currentQuestion={currentQuestion}
				handleAnsweredChange={handleAnsweredChange}
				quizCompleted={quizCompleted}
			/>

			<div className='flex flex-row justify-center gap-[10px]'>
				{currentQuestionIndex >= 1 && (
					<ReturnButton onClick={handleReturnToBackAnswer} text='Cofnij' />
				)}

				<NextorFinishButton
					onClick={handleNextQuestion}
					currentQuestionIndex={currentQuestionIndex}
					quizzes={quizQuestions}
					quizCompleted={quizCompleted}
				/>
				{quizCompleted && <ReapetQuizButton onClick={handleRepeatQuiz} />}
			</div>
			{currentQuestionIndex === 0 && (
				<>
					<AddQuestion
						fetchQuizzes={fetchQuizzes}
						setQuizCompleted={setQuizCompleted}
						setCurrentQuestionIndex={setCurrentQuestionIndex}
						setScore={setScore}
					/>
					{!quizCompleted ? (
						<DeleteQuestion
							fetchQuizzes={fetchQuizzes}
							quizzes={quizQuestions}
						/>
					) : null}
				</>
			)}
			<QuizResult
				quizCompleted={quizCompleted}
				score={score}
				quizQuestions={quizQuestions}
			/>
		</div>
	);
};
