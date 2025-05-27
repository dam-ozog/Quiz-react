import React from "react";
import { CurrentReviewQuestionProps } from "../../../Types/Type";

export const CurrentReviewQuestion: React.FC<CurrentReviewQuestionProps> = ({
	currentQuestion,
	handleAnsweredChange,
	quizCompleted,
}) => {
	if (quizCompleted || !currentQuestion) return null;
	return (
		<div className='flex flex-col items-center'>
			<h3 className='text-[22px] underline underline-offset-[8px]'>
				{currentQuestion.question}
			</h3>
			<div className='m-[20px] min-w-[300px] mx-auto pl-[50px]'>
				{currentQuestion.answers.map(answer => (
					// <div
					// 	key={answer.answer}
					// 	className='p-[8px] bg-[#969421]'>
						<label
						key={answer.answer}
							className='flex items-center cursor-pointer p-[8px]'
							htmlFor={answer.answer}>
								<input
							type='radio'
							id={answer.answer}
							name='answer'
							value={answer.answer}
							onChange={handleAnsweredChange}
							className='radio radio-success'
							checked={currentQuestion.selectedAnswer === answer.answer}
						/>
							<span className='ml-[10px] text-[18px]'>{answer.answer}</span>
						</label>
					// </div>
				))}
			</div>
		</div>
	);
};
