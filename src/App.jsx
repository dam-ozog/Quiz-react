import { useEffect, useState } from "react";
import "./App.css";
// import Button from "./components/Button/Button";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import { ReapetQuizButton } from "./components/ReapetQuizButton/ReapetQuizButton";
import { NextorFinishButton } from "./components/NextorFinishButton/NextorFinishButton";
import { DeleteQuestion } from "./components/DeleteQuestion/DeleteQuestion";
import { DownloadQuestions } from "./DownloadAPIHook/DowloadQuestions";
import { ReturnButton } from "./components/ReturnButton/ReturnButton";

function App() {
	const { questions, fetchQuestions } = DownloadQuestions();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState([]);
	const [quizComplited, setQuizComplited] = useState(false);
	// const [questions, setQuestions] = useState([]);
	// const [visibleQuestions, setVisibleQuestions] = useState(true);
	// const [repeatQuiz, setRepeatQuiz] = useState(false);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	const handleAnsweredChange = e => {
		setSelectedAnswer(e.target.value);
	};

	const handleCheckAnswer = () => {
		const currentQuestion = questions[currentQuestionIndex];
		const correctAnswer = currentQuestion.answers.find(
			ans => ans.value === true
		);
		// console.log("Selected answer", selectedAnswer)
		// console.log("Correct answer", correctAnswer?.answer)

		if (selectedAnswer === correctAnswer.answer) {
			setScore(prevScore => prevScore + 1);
		}
	};

	const handleNextQuestion = () => {
		const currentQuestion = questions[currentQuestionIndex];
		handleCheckAnswer();
		console.log(currentQuestionIndex);

		setAnsweredQuestions([
			...answeredQuestions,
			{
				question: currentQuestion.question,
				selectedAnswer: selectedAnswer,
				correctAnswer: currentQuestion.answers.find(an => an.value === true),
			},
		]);

		console.log("Questions:", currentQuestion.selectedAnswer);
		console.log("Current Question Index:", currentQuestionIndex);
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(null);
		} else {
			setQuizComplited(true);
			setSelectedAnswer(null);
			setCurrentQuestionIndex(0);
			// setVisibleQuestions(false);
			// setRepeatQuiz(true);
		}
	};

	const handleRepeatQuiz = () => {
		// setRepeatQuiz(false);
		setCurrentQuestionIndex(0);
		setQuizComplited(false);
		setScore(0);
		// setVisibleQuestions(true);
	};

	const handleReturnToBackAnswer = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);
	};

	const currentQuestion = questions[currentQuestionIndex];
	return (
		<div className='quiz-container'>
			<h1>Quiz</h1>
			<AddQuestion fetchQuestions={fetchQuestions} />
			<DeleteQuestion fetchQuestions={fetchQuestions} />
			{currentQuestion && (
				<div className='answers-container'>
					{!quizComplited && (
						<>
							<h3>{currentQuestion.question}</h3>
							{currentQuestion.answers.map(answer => (
								<div key={answer.answer} className='answers'>
									<input
										type='radio'
										id={answer.answer}
										name='answer'
										value={answer.answer}
										onChange={handleAnsweredChange}
									/>
									<label htmlFor={answer.answer}>{answer.answer}</label>
								</div>
							))}
						</>
					)}
				</div>
			)}

			<div className='two-button'>
				{currentQuestionIndex >= 1 ? (
					<ReturnButton onClick={handleReturnToBackAnswer} text='Cofnij' />
				) : null}
				{!quizComplited && (
					<NextorFinishButton
						onClick={handleNextQuestion}
						currentQuestionIndex={currentQuestionIndex}
						questions={questions}
					/>
				)}
				{quizComplited && <ReapetQuizButton onClick={handleRepeatQuiz} />}
			</div>
			<h3>
				{quizComplited &&
					`Quiz zakończony ! Twój wynik to: ${score} na ${questions.length}`}
			</h3>
		</div>
	);
}

export default App;
