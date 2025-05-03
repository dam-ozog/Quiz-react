import { useEffect, useState } from "react";
import AddQuestion from "./components/transitions/AddQuestion/AddQuestion";
import { DeleteQuestion } from "./components/transitions/DeleteQuestion/DeleteQuestion";
import { DownloadQuestions } from "./services/DownloadQuestion/DowloadQuestions";
import { CustomButton } from "./components/common/customButton/CustomButton";
import { CurrentReviewQuestion } from "./components/transitions/CurrentReviewQuestion/CurrentReviewQuestions";
import {
	defaultQuizStatistic,
	Quiz,
	QuizQuestion,
	QuizStatistic,
} from "./Types/Type";
import { useParams } from "react-router-dom";
import { QuizResult } from "./components/transitions/QuizResult/QuizResult";
import {
	handleAnsweredChange,
	handleNextQuestion,
	handleRepeatQuiz,
	handleReturnToBackAnswer,
} from "./helpers/quizLogic/quizLogic";

export const QuizApp = () => {
	const { quizzes, fetchQuizzes } = DownloadQuestions();
	const { id } = useParams();

	const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
	const [quizInfo, setQuizInfo] = useState<QuizStatistic>(defaultQuizStatistic);

	const currentQuestion: QuizQuestion | undefined =
		currentQuiz?.questions[quizInfo.currentQuestionIndex]; //odczytujemy aktualne pytanie

	useEffect(() => {
		const loadQuizes = async () => {
			try {
				fetchQuizzes();
			} catch (error) {
				console.error("Błąd podaczas pobierania quizów", error);
			}
		};
		loadQuizes();
	}, [fetchQuizzes]);

	useEffect(() => {
		if (id && quizzes.length > 0) {
			const foundQuiz = quizzes.find(quiz => quiz._id === id);
			if (foundQuiz) {
				setQuizInfo(defaultQuizStatistic);
				setCurrentQuiz(foundQuiz);
			}
		}
	}, [id, quizzes]);

	let btnText = "Następne pytanie";
	if (
		currentQuiz &&
		quizInfo.currentQuestionIndex === currentQuiz.questions.length - 1
	) {
		btnText = "Zakoń quiz";
	}

	if (!currentQuiz) {
		return (
			<div className='text-center'>
				<p className='text-lg'>Ładowanie pytań</p>
				<span className='loading loading-bars loading-lg'></span>
			</div>
		);
	}

	return (
		<div className='text-center p-[30px]'>
			<h1 className='text-center p-[10px] text-[32px]'>{currentQuiz.title}</h1>
			<CurrentReviewQuestion
				currentQuestion={currentQuestion}
				handleAnsweredChange={e =>
					handleAnsweredChange(e, currentQuiz, currentQuestion, setCurrentQuiz)
				}
				quizCompleted={quizInfo.completed}
			/>
			<div className='flex flex-row justify-center gap-[10px]'>
				{quizInfo.currentQuestionIndex >= 1 && (
					<CustomButton
						text='Cofnij'
						onClick={() => handleReturnToBackAnswer(setQuizInfo)}
						className={"btn btn-outline"}
					/>
				)}
				{!quizInfo.completed && (
					<CustomButton
						text={btnText}
						className='btn btn-accent w-[200px]'
						onClick={() =>
							handleNextQuestion(currentQuiz, quizInfo, setQuizInfo)
						}
						completed={quizInfo.completed}
					/>
				)}
				{quizInfo.completed && (
					<CustomButton
						text='Powtórz'
						onClick={() =>
							handleRepeatQuiz(setQuizInfo, currentQuiz, setCurrentQuiz)
						}
						className='btn glass m-[15px] w-[200px]'
					/>
				)}
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
