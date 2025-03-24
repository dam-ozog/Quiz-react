import { useEffect, useState } from "react";
import AddQuestion from "./components/transitions/AddQuestion/AddQuestion";
import { ReapetQuizButton } from "./components/transitions/ReapetQuizButton/ReapetQuizButton";
import { NextorFinishButton } from "./components/transitions/NextorFinishButton/NextorFinishButton";
import { DeleteQuestion } from "./components/transitions/DeleteQuestion/DeleteQuestion";
import { DownloadQuestions } from "./services/DownloadQuestion/DowloadQuestions";
import { CustomButton } from "./components/common/customButton/CustomButton";
import { CurrentReviewQuestion } from "./components/transitions/CurrentReviewQuestion/CurrentReviewQuestions";
import { Quiz, QuizQuestion } from "./Types/Type";
import { useParams } from "react-router-dom";
import { QuizResult } from "./components/transitions/QuizResult/QuizResult";
import {
	checkAnswer,
	resetAnswers,
	updateSelectedAnswer,
} from "./helpers/quizHelper/quizHelper";

interface QuizStatistic {
	completed: boolean;
	score: number;
	currentQuestionIndex: number;
}

const defaultQuizStatistic: QuizStatistic = {
	completed: false,
	currentQuestionIndex: 0,
	score: 0,
};

export const QuizApp = () => {
	const { quizzes, fetchQuizzes } = DownloadQuestions();
	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(false);
	const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
	const [quizInfo, setQuizInfo] = useState<QuizStatistic>(defaultQuizStatistic);

	const currentQuestion: QuizQuestion | undefined =
		currentQuiz?.questions[quizInfo.currentQuestionIndex]; //odczytujemy aktualne pytanie

	useEffect(() => {
		const loadQuizes = async () => {
			setIsLoading(true);
			try {
				fetchQuizzes();
			} catch (error) {
				console.error("Błąd podaczas pobierania quizów", error);
			} finally {
				setIsLoading(false);
			}
		};
		loadQuizes();
	}, [fetchQuizzes]);

	useEffect(() => {
		setIsLoading(true);
		if (id && quizzes.length > 0) {
			const foundQuiz = quizzes.find(quiz => quiz._id === id);
			// console.log("Found Quiz:", foundQuiz);
			if (foundQuiz) {
				setQuizInfo(defaultQuizStatistic);
				setCurrentQuiz(foundQuiz);
				setIsLoading(false);
			}
		}
	}, [id, quizzes]);

	const handleAnsweredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!currentQuiz || !currentQuestion) return;

		const updatedQuestions = updateSelectedAnswer(
			currentQuiz.questions,
			currentQuestion._id,
			e.target.value
		);

		setCurrentQuiz(prevQuiz => {
			if (!prevQuiz) return prevQuiz;
			return { ...prevQuiz, questions: updatedQuestions };
		});
	};

	const handleNextQuestion = () => {
		if (!currentQuiz) {
			console.log("currentQuiz is undefined");
			return;
		}
		if (quizInfo.currentQuestionIndex < currentQuiz.questions.length - 1) {
			setQuizInfo(prev => ({
				...prev,
				currentQuestionIndex: prev.currentQuestionIndex + 1,
			}));
		} else {
			setQuizInfo({
				completed: true,
				currentQuestionIndex: 0,
				score: checkAnswer(currentQuiz.questions),
			});
		}
	};

	const handleRepeatQuiz = () => {
		setQuizInfo(defaultQuizStatistic);

		if (currentQuiz) {
			setCurrentQuiz({
				...currentQuiz,
				questions: resetAnswers(currentQuiz.questions),
			});
		}
	};

	const handleReturnToBackAnswer = () => {
		setQuizInfo(prev => ({
			...prev,
			currentQuestionIndex: prev.currentQuestionIndex - 1,
		}));
	};

	let btnText = "Następne pytanie";
	if (currentQuiz && quizInfo.currentQuestionIndex === currentQuiz.questions.length -1) {
		btnText = "Zakoń quiz";
	}

	if (!currentQuiz) {
		return <div className='text-center'>Quiz nie został znaleziony</div>;
	}

	if (isLoading) {
		//sprawdzić suspense
		return (
			<div className='text-center'>
				<p>Ładowanie pytań</p>
				<span className='loading loading-bars loading-lg'></span>
			</div>
		);
	}
	//sprawdzić tailwind
	return (
		<div className='text-center m-auto p-[2rem] italic text-[20px]'>
			<h1 className='p-[1rem] text-[34px]'>{currentQuiz.title}</h1>
			<CurrentReviewQuestion
				currentQuestion={currentQuestion}
				handleAnsweredChange={handleAnsweredChange}
				quizCompleted={quizInfo.completed}
			/>
			<div className='flex flex-row justify-center gap-[10px]'>
				{quizInfo.currentQuestionIndex >= 1 && (
					<CustomButton
						onClick={handleReturnToBackAnswer}
						className={"btn btn-outline"}
						text='Cofnij'
					/>
				)}
				<CustomButton
					className='btn btn-accent'
					onClick={handleNextQuestion}
					text={btnText}
					completed={quizInfo.completed}
				/>

				{quizInfo.completed && <ReapetQuizButton onClick={handleRepeatQuiz} />}
			</div>
			{quizInfo.currentQuestionIndex === 0 && (
				<>
					<AddQuestion fetchQuizzes={fetchQuizzes} setQuizInfo={setQuizInfo} />
					{!quizInfo.completed ? (
						<DeleteQuestion
							fetchQuizzes={fetchQuizzes}
							quizzes={currentQuiz.questions}
						/>
					) : null}
				</>
			)}
			<QuizResult
				quizCompleted={quizInfo.completed}
				score={quizInfo.score}
				quizQuestions={currentQuiz.questions}
			/>
		</div>
	);
};
