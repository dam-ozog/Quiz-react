import { QuizResultProps } from "../../Types/Type";

export const QuizResult: React.FC<QuizResultProps> = ({
	quizCompleted,
	score,
	quizQuestions,
}) => {
	return (
		quizCompleted && (
			<h3 className='mt-[20px]'>
				{`Quiz zakończony ! Twój wynik to: ${score} na ${quizQuestions.length}`}
			</h3>
		)
	);
};
