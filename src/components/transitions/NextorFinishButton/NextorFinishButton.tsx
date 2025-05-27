import { NextorFinishButtonProps } from "../../../Types/Type";

export const NextorFinishButton: React.FC<NextorFinishButtonProps> = ({
	currentQuestionIndex,
	onClick,
	quizzes,
	quizCompleted
}) => {
	if (quizCompleted) {
		return null;
	} 
		const info = currentQuestionIndex === quizzes.length - 1
			? "Zakończ quiz"
			: "Następne pytanie"
	

	return (
		<div className="flex gap-2">
			<button className='btn btn-accent' onClick={onClick}> 
				{info}
			</button>
		</div>
	);
};
//ma wyświetlać sam label logika powyżej