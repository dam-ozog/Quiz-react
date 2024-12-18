import PropTypes from "prop-types";

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
}) => {
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
			setCurrentQuestionIndex(0);
		}
	};
	return (
		<button onClick={handleNextQuestion}>
			{currentQuestionIndex === questions.length - 1
				? "Zakończ quiz"
				: "Następne pytanie"}
		</button>
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
};

export default Button;
