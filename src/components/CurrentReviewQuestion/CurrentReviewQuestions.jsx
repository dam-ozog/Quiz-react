/* eslint-disable react/prop-types */
export const CurrentReviewQuestion = ({currentQuestion, handleAnsweredChange}) => {
	return (
		<>
			<h3 className="text-[22px] underline underline-offset-[8px]">{currentQuestion.question}</h3>
			{currentQuestion.answers.map(answer => (
				<div key={answer.answer} className='p-[10px] mb-[10px]'>
					
					<label className="" htmlFor={answer.answer}>{answer.answer}<input
						type='radio'
						id={answer.answer}
						name='answer'
						value={answer.answer}
						onChange={handleAnsweredChange}
						className="ml-[5px]"
					/></label>
				</div>
			))}
		</>
	);
};
