import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import AddQuestion from "./components/AddQuestion/AddQuestion";

function App() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState([]);
	const [quizComplited, setQuizComplited] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [visibleQuestions, setVisibleQuestions] = useState(true)

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
				)
				}

				</div>
			)}
			<Button
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
			/>
			<h3>
				{quizComplited &&
					`Quiz zakończony ! Twój wynik to: ${score} na ${questions.length}`}
			</h3>
		</div>
	);
}

export default App;
