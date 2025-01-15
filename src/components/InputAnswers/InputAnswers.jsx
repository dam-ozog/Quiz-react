export const InputAnswers = ({
	answers,
	handleCheckboxChange,
	handleAnswerTextChange,
}) => {
	return answers.map((answer, index) => (
		<div key={index}>
			<input
				type='text'
				placeholder='Treść odpowiedzi'
				value={answer.answer} // Poprawne wiązanie pola tekstowego
				onChange={e => handleAnswerTextChange(index, e.target.value)}
				required
			/>
			<label>
				<input
					type='radio'
					name="good"
					checked={answer.value} // Poprawne wiązanie checkboxa
					onChange={e => handleCheckboxChange(index, e.target.checked)}
				/>
				Poprawna
			</label>
		</div>
	));
};
