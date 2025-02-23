import { useEffect, useState } from "react";
import AddQuestion from "../components/AddQuestion/AddQuestion";
import { ReapetQuizButton } from "../components/ReapetQuizButton/ReapetQuizButton";
import { NextorFinishButton } from "../components/NextorFinishButton/NextorFinishButton";
import { DeleteQuestion } from "../components/DeleteQuestion/DeleteQuestion";
import { DownloadQuestions } from "../DownloadAPIHook/DowloadQuestions";
import { ReturnButton } from "../components/ReturnButton/ReturnButton";
import { CurrentReviewQuestion } from "../components/CurrentReviewQuestion/CurrentReviewQuestions";
import { AnsweredQuestion, QuizQuestion } from "../Types/Type";
import {  useParams } from "react-router-dom";

export const QuizApp = () => {
	const { questions, fetchQuestions } = DownloadQuestions();
	const { id } = useParams();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>("");
	const [score, setScore] = useState<number>(0);
	const [answeredQuestions, setAnsweredQuestions] = useState<
		AnsweredQuestion[]
	>([]);
	const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
	const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
	const [quizName, setQuizName] = useState<string>("");

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	useEffect(() => {
		if (id && questions.length > 0) {
			const foundQuiz = questions.find(quiz => quiz.id === id);
			if (foundQuiz) {
				setQuizQuestions(foundQuiz.questions);
				setCurrentQuestionIndex(0);
				setQuizCompleted(false);
				setScore(0);
				setQuizName(foundQuiz.title);
			}
		}
	}, [id, questions]);

	const currentQuestion: QuizQuestion | null =
		quizQuestions[currentQuestionIndex] || null; //odczytujemy listę pytań

	const handleAnsweredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedAnswer(e.target.value);
	};

	const handleCheckAnswer = () => {
		if (!currentQuestion || !selectedAnswer) return false;

		// const currentQuestion = questions[currentQuestionIndex];
		const correctAnswer = currentQuestion.answers.find(
			ans => ans.value === true
		);

		if (selectedAnswer === correctAnswer?.answer) {
			return true;
		} else {
			return false;
		}
	};

	const handleNextQuestion = () => {
		// const currentQuestion = questions[currentQuestionIndex];
		const isCorrect = handleCheckAnswer();

		if (isCorrect) {
			setScore(prev => prev + 1);
		}

		setAnsweredQuestions([
			...answeredQuestions,
			{
				question: currentQuestion.question,
				selectedAnswer: selectedAnswer,
				correctAnswer: currentQuestion.answers.find(ans => ans.value === true)!,
			},
		]);

		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(null);
		} else {
			setQuizCompleted(true);
			setSelectedAnswer(null);
			setCurrentQuestionIndex(0);
		}
	};

	const handleRepeatQuiz = () => {
		setCurrentQuestionIndex(0);
		setQuizCompleted(false);
		setScore(0);
	};

	const handleReturnToBackAnswer = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);
	};

	return (
		<div className='max-w-1280 text-center m-auto p-[2rem] italic text-[20px]'>
			<h1 className='p-[1rem] text-[34px]'>{quizName}</h1>

			{currentQuestion && (
				<div>
					{!quizCompleted && (
						<CurrentReviewQuestion
							currentQuestion={currentQuestion}
							handleAnsweredChange={handleAnsweredChange}
						/>
					)}
				</div>
			)}

			<div className='flex flex-row justify-center gap-[10px]'>
				{currentQuestionIndex >= 1 ? (
					<ReturnButton onClick={handleReturnToBackAnswer} text='Cofnij' />
				) : null}
				{!quizCompleted && (
					<NextorFinishButton
						onClick={handleNextQuestion}
						currentQuestionIndex={currentQuestionIndex}
						questions={quizQuestions}
					/>
				)}

				{quizCompleted && <ReapetQuizButton onClick={handleRepeatQuiz} />}
			</div>
			{currentQuestionIndex === 0 && (
				<div className='mt-[20px]'>
					<AddQuestion
						fetchQuestions={fetchQuestions}
						setQuizCompleted={setQuizCompleted}
						setCurrentQuestionIndex={setCurrentQuestionIndex}
						setScore={setScore}
					/>
					{!quizCompleted ? (
						<DeleteQuestion
							fetchQuestions={fetchQuestions}
							questions={quizQuestions}
						/>
					) : null}
				</div>
			)}
			<h3 className='mt-[20px]'>
				{quizCompleted &&
					`Quiz zakończony ! Twój wynik to: ${score} na ${quizQuestions.length}`}
			</h3>
		</div>
	);
};
