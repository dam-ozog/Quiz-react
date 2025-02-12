import { InputAnswersProps } from "../../Types/Type";

export const InputAnswers: React.FC<InputAnswersProps> = ({
	answers,
	handleCheckboxChange,
	handleAnswerTextChange,
}) => {
	return answers.map((answer, index) => (
		<div className="m-[15px]" key={index}>
			<input
				type='text'
				placeholder='Treść odpowiedzi'
				value={answer.answer} // Poprawne wiązanie pola tekstowego
				onChange={e => handleAnswerTextChange(index, e.target.value)}
				required
				className="input input-bordered input-info w-full max-w-xs"
			/>
			<label>
				<input
					type='radio'
					name="good"
					checked={answer.value} // Poprawne wiązanie checkboxa
					onChange={() => handleCheckboxChange(index)}
					className="m-[5px]"
				/>
				Poprawna
			</label>
		</div>
	));
};
