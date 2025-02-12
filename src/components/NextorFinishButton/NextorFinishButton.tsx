import { NextorFinishButtonProps } from "../../Types/Type";

export const NextorFinishButton: React.FC<NextorFinishButtonProps> = ({
	currentQuestionIndex,
	onClick,
	questions,
}) => {
	return (
		<button className="btn btn-accent " onClick={onClick}>
			{currentQuestionIndex === questions.length - 1
				? "Zakończ quiz"
				: "Następne pytanie"}
		</button>
	);
};