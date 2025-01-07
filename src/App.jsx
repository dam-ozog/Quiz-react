import { useEffect, useState } from "react";
import "./App.css";
// import Button from "./components/Button/Button";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import { ReapetQuizButton } from "./components/ReapetQuizButton/ReapetQuizButton";
import { NextorFinishButton } from "./components/NextorFinishButton/NextorFinishButton";

function App() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState([]);
	const [quizComplited, setQuizComplited] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [visibleQuestions, setVisibleQuestions] = useState(true);
	const [repeatQuiz, setRepeatQuiz] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5000/questions")
			.then(res => res.json())
			.then(data => {
				setQuestions(data);
			})
			.catch(error => {
				console.error("Error fetching data:", error);
			});
	});

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

		setAnsweredQuestions([
			...answeredQuestions,
			{
				question: currentQuestion.question,
				selectedAnswer: selectedAnswer,
				correctAnswer: currentQuestion.answers.find(an => an.value === true),
			},
		]);

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(null);
		} else {
			setQuizComplited(true);
			setSelectedAnswer(null);
			setVisibleQuestions(false);
			setRepeatQuiz(true);
		}
	};

	const handleRepeatQuiz = () => {
		setRepeatQuiz(false);
		setCurrentQuestionIndex(0);
		setQuizComplited(false);
		setScore(0);
		setVisibleQuestions(true);
	};

	const currentQuestion = questions[currentQuestionIndex];
	return (
		<div className='quiz-container'>
			<h1>Quiz</h1>
			<AddQuestion />
			{currentQuestion && (
				<div className='answers-container'>
					{visibleQuestions && (
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
			{/* <Button
				currentQuestionIndex={currentQuestionIndex}
				questions={questions}
				selectedAnswer={selectedAnswer}
				checkAnswer={handleCheckAnswer}
				setSelectedAnswer={setSelectedAnswer}
				setCurrentQuestionIndex={setCurrentQuestionIndex}
				setQuizComplited={setQuizComplited}
				setAnsweredQuestions={setAnsweredQuestions}
				answeredQuestions={answeredQuestions}
				setScore={setScore}
				setVisibleQuestions={setVisibleQuestions}
			/> */}
			<div>
				<NextorFinishButton onClick={handleNextQuestion} currentQuestionIndex={currentQuestionIndex} questions={questions}/>
				<ReapetQuizButton onClick={handleRepeatQuiz}/>
			</div>
			<h3>
				{quizComplited &&
					`Quiz zakończony ! Twój wynik to: ${score} na ${questions.length}`}
			</h3>
		</div>
	);
}

export default App;
