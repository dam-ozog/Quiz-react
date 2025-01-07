import PropTypes from "prop-types";
import { useState } from "react";
import { NextFinishButton } from '../NextFinishButton/NextFinishButton'

const Button = ({
	currentQuestionIndex,
	questions,
	selectedAnswer,
	checkAnswer,
	setSelectedAnswer,
	setCurrentQuestionIndex,
	setQuizComplited,
	setAnsweredQuestions,
	answeredQuestions,
	setScore,
	setVisibleQuestions,
}) => {
	const [repeatQuiz, setRepeatQuiz] = useState(false);

	const handleNextQuestion = () => {
		const currentQuestion = questions[currentQuestionIndex];
		checkAnswer();


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
	}
	
	return (
		<>
		<NextFinishButton currentQuestionIndex={currentQuestionIndex} onClick={handleNextQuestion} questions={questions} />
		{/* <button onClick={handleNextQuestion} disabled={currentQuestionIndex === false}>
			{currentQuestionIndex === questions.length - 1
				? "Zakończ quiz"
				: "Następne pytanie"}
		</button> */}
		{repeatQuiz && <button onClick={handleRepeatQuiz}>Powtórz Quiz</button>}
				</>
	);
};

Button.propTypes = {
	currentQuestionIndex: PropTypes.number.isRequired,
	questions: PropTypes.array.isRequired,
	selectedAnswer: PropTypes.string,
	checkAnswer: PropTypes.func.isRequired,
	setSelectedAnswer: PropTypes.func.isRequired,
	setCurrentQuestionIndex: PropTypes.func.isRequired,
	setQuizComplited: PropTypes.func.isRequired,
	setAnsweredQuestions: PropTypes.func.isRequired,
	answeredQuestions: PropTypes.array.isRequired, // must be a function
	setScore: PropTypes.func.isRequired,
	setVisibleQuestions: PropTypes.func.isRequired,
};

export default Button;
