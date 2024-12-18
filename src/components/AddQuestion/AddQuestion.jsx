import { useState } from "react";
import "./AddQuestion.css";

const AddQuestion = () => {
	const [visible, setVisible] = useState(false);
	const [questionText, setQuestionText] = useState("");
	const [answers, setAnswers] = useState([{ answer: "", value: false }]);

	// Funkcja do aktualizacji tekstu odpowiedzi
	const handleAnswerTextChange = (index, newText) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].answer = newText; // Zmieniamy tylko tekst odpowiedzi
		setAnswers(updatedAnswers);
	};

	// Funkcja do obsługi zmiany checkboxa
	const handleCheckboxChange = (index, isChecked) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].value = isChecked; // Zmieniamy tylko wartość 'value'
		setAnswers(updatedAnswers);
	};

	// Dodanie nowej odpowiedzi
	const addAnswer = () => {
		if (answers.length < 3) {
			setAnswers([...answers, { answer: "", value: false }]);
		}
		console.log(answers);
	};

	const SaveQuestion = async () => {
		if (questionText && answers.length >= 3) {
			try {
				const response = await fetch("http://localhost:5000/questions", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						question: questionText,
						answers,
					}),
				});
				if (response.ok) {
					setVisible(false);
					setQuestionText("");
					setAnswers([{ answer: "", value: false }]);
				} else {
					console.error("Błąd podcas zapisywania pytania");
				}
			} catch (error) {
				console.error("Wystąpił błąd", error);
			}
		}
	};

	return (
		<div>
			{!visible && (
				<button onClick={() => setVisible(true)}>Dodaj nowe pytanie</button>
			)}
			{visible && (
				<form>
					<div>
						<div>
							<label htmlFor='question'>Treść pytania:</label>
							<input
								type='text'
								value={questionText}
								onChange={e => setQuestionText(e.target.value)}
							/>
						</div>
						<h4>Odpowiedzi</h4>
						{answers.map((answer, index) => (
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
										type='checkbox'
										checked={answer.value} // Poprawne wiązanie checkboxa
										onChange={e =>
											handleCheckboxChange(index, e.target.checked)
										}
									/>
									Poprawna
								</label>
							</div>
						))}
						<button
							type='button'
							onClick={addAnswer}
							disabled={answers.length >= 3}>
							Dodaj pytanie
						</button>
						<button
							disabled={answers.length < 3 || !questionText}
							type='button'
							onClick={SaveQuestion}>
							Zapisz pytanie
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default AddQuestion;
