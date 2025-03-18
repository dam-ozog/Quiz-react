import { NextorFinishButtonProps } from "../../Types/Type";

export const NextorFinishButton: React.FC<NextorFinishButtonProps> = ({
	currentQuestionIndex,
	onClick,
	quizzes,
	quizCompleted
}) => {
	if (quizCompleted) return null;
	return (
		<div className="flex gap-2">
			<button className='btn btn-accent' onClick={onClick}>
				{currentQuestionIndex === quizzes.length - 1
					? "Zakończ quiz"
					: "Następne pytanie"}
			</button>
		</div>
	);
};
