import PropTypes from "prop-types";

export const NextFinishButton = ({
	currentQuestionIndex,
	onClick,
	questions,
}) => {
	return (
		<button onClick={onClick}>
			{currentQuestionIndex === questions.length - 1
				? "Zakończ quiz"
				: "Następne pytanie"}
		</button>
	);
};

NextFinishButton.propTypes = {
	currentQuestionIndex: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	questions: PropTypes.array.isRequired,
};
