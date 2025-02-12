import { useEffect, useState } from "react";
// import "./App.css";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import { ReapetQuizButton } from "./components/ReapetQuizButton/ReapetQuizButton";
import { NextorFinishButton } from "./components/NextorFinishButton/NextorFinishButton";
import { DeleteQuestion } from "./components/DeleteQuestion/DeleteQuestion";
import { DownloadQuestions } from "./DownloadAPIHook/DowloadQuestions";
import { ReturnButton } from "./components/ReturnButton/ReturnButton";
import { CurrentReviewQuestion } from "./components/CurrentReviewQuestion/CurrentReviewQuestions";
import { AnsweredQuestion } from "./Types/Type";
import { QuizApp } from "./QuizApp/QuizApp";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import FirstPage from "./components/FirstPage/FirstPage";

function App() {
	// const { questions, fetchQuestions } = DownloadQuestions();

	// const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	// const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	// const [score, setScore] = useState<number>(0);
	// const [answeredQuestions, setAnsweredQuestions] = useState<
	// 	AnsweredQuestion[]
	// >([]);
	// const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

	// useEffect(() => {
	// 	fetchQuestions();
	// }, [fetchQuestions]);

	// const handleAnsweredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setSelectedAnswer(e.target.value);
	// };

	// const handleCheckAnswer = () => {
	// 	const currentQuestion = questions[currentQuestionIndex];
	// 	const correctAnswer = currentQuestion.answers.find(
	// 		ans => ans.value === true
	// 	);

	// 	if (selectedAnswer === correctAnswer?.answer) {
	// 		setScore(prevScore => prevScore + 1);
	// 	}
	// };

	// const handleNextQuestion = () => {
	// 	const currentQuestion = questions[currentQuestionIndex];
	// 	handleCheckAnswer();

	// 	setAnsweredQuestions([
	// 		...answeredQuestions,
	// 		{
	// 			question: currentQuestion.question,
	// 			selectedAnswer: selectedAnswer,
	// 			correctAnswer: currentQuestion.answers.find(ans => ans.value === true)!,
	// 		},
	// 	]);

	// 	if (currentQuestionIndex < questions.length - 1) {
	// 		setCurrentQuestionIndex(currentQuestionIndex + 1);
	// 		setSelectedAnswer(null);
	// 	} else {
	// 		setQuizCompleted(true);
	// 		setSelectedAnswer(null);
	// 		setCurrentQuestionIndex(0);
	// 	}
	// };

	// const handleRepeatQuiz = () => {
	// 	setCurrentQuestionIndex(0);
	// 	setQuizCompleted(false);
	// 	setScore(0);
	// };

	// const handleReturnToBackAnswer = () => {
	// 	setCurrentQuestionIndex(currentQuestionIndex - 1);
	// };

	// const currentQuestion = questions[currentQuestionIndex];

	// return (
	// 	<div className='max-w-1280 text-center m-auto p-[2rem] italic text-[20px]'>
	// 		<h1 className='p-[1rem] text-[34px]'>Quiz</h1>

	// 		{currentQuestion && (
	// 			<div>
	// 				{!quizCompleted && (
	// 					<CurrentReviewQuestion
	// 						currentQuestion={currentQuestion}
	// 						handleAnsweredChange={handleAnsweredChange}
	// 					/>
	// 				)}
	// 			</div>
	// 		)}

	// 		<div className='flex flex-row justify-center gap-[10px]'>
	// 			{currentQuestionIndex >= 1 ? (
	// 				<ReturnButton onClick={handleReturnToBackAnswer} text='Cofnij' />
	// 			) : null}
	// 			{!quizCompleted && (
	// 				<NextorFinishButton
	// 					onClick={handleNextQuestion}
	// 					currentQuestionIndex={currentQuestionIndex}
	// 					questions={questions}
	// 				/>
	// 			)}

	// 			{quizCompleted && <ReapetQuizButton onClick={handleRepeatQuiz} />}
	// 		</div>
	// 		{currentQuestionIndex === 0 && (
	// 			<div className='mt-[20px]'>
	// 				<AddQuestion fetchQuestions={fetchQuestions} setQuizCompleted={setQuizCompleted} setCurrentQuestionIndex={setCurrentQuestionIndex} setScore={setScore}/>
	// 				{!quizCompleted ? (
	// 					<DeleteQuestion
	// 						fetchQuestions={fetchQuestions}
	// 						questions={questions}
	// 					/>
	// 				) : null}
	// 			</div>
	// 		)}
	// 		<h3 className='mt-[20px]'>
	// 			{quizCompleted &&
	// 				`Quiz zakończony ! Twój wynik to: ${score} na ${questions.length}`}
	// 		</h3>
	// 	</div>
	// );
	return(
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<FirstPage />}/>
				<Route path="/quiz" element={<QuizApp />}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
