import React from "react";
import { CurrentReviewQuestionProps } from "../../Types/Type";

export const CurrentReviewQuestion: React.FC<CurrentReviewQuestionProps> = ({
	currentQuestion,
	handleAnsweredChange,
	quizCompleted
}) => {
	if (quizCompleted || !currentQuestion) return null;
	return (
		<>
			<h3 className='text-[22px] underline underline-offset-[8px]'>
				{currentQuestion.question}
			</h3>
			{currentQuestion.answers.map(answer => (
				<div key={answer.answer} className='p-[10px] mb-[10px]'>
					<label className='' htmlFor={answer.answer}>
						{answer.answer}
						<input
							type='radio'
							id={answer.answer}
							name='answer'
							value={answer.answer}
							onChange={handleAnsweredChange}
							className='ml-[5px] radio radio-success'
							checked={currentQuestion.selectedAnswer === answer.answer}
						/>
					</label>
				</div>
			))}
		</>
	);
};
