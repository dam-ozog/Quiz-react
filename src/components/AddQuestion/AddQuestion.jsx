/* eslint-disable no-undef */
import { useState } from "react";
import "./AddQuestion.css";
import { InputAnswers } from "../InputAnswers/InputAnswers";
import { ReturnButton } from "../ReturnButton/ReturnButton";

// eslint-disable-next-line react/prop-types
const AddQuestion = ({ fetchQuestions }) => {
	const [visible, setVisible] = useState(false);
	const [questionText, setQuestionText] = useState("");
	const [answers, setAnswers] = useState([
		{ answer: "", value: false },
		{ answer: "", value: false },
		{ answer: "", value: false },
	]);

	const API_BASE_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/api"
			: "/api";

	// Funkcja do aktualizacji tekstu odpowiedzi
	const handleAnswerTextChange = (index, newText) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].answer = newText; // Zmieniamy tylko tekst odpowiedzi
		setAnswers(updatedAnswers);
	};

	// Funkcja do obsługi zmiany checkboxa
	const handleCheckboxChange = index => {
		const updatedAnswers = answers.map((answer, i) => ({
			...answer,
			value: i === index,
		}));
		setAnswers(updatedAnswers);
	};

	const SaveQuestion = async () => {
		if (questionText && answers.length >= 3) {
			try {
				const response = await fetch(`${API_BASE_URL}/questions`, {
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
					setAnswers([
						{ answer: "", value: false },
						{ answer: "", value: false },
						{ answer: "", value: false },
					]);
					fetchQuestions();
				} else {
					console.error("Błąd podcas zapisywania pytania");
				}
			} catch (error) {
				console.error("Wystąpił błąd", error);
			}
		}
	};

	return (
		<div className="max-w-[350px] m-auto mb-[20px]">
			{!visible && (
				<button className="btn btn-outline btn-success" onClick={() => setVisible(true)}>Dodaj nowe pytanie</button>
			)}
			{visible && (
				<form>
					<div>
						<div className="m-[10px]">
							<label htmlFor='question'>Treść pytania:</label>
							<input
								type='text'
								value={questionText}
								onChange={e => setQuestionText(e.target.value)}
								placeholder="Wpisz treść pytania"
								className="input input-bordered input-primary w-full max-w-xs"
							/>
						</div>
						<h4 className="p-[10px] underline underline-offset-2">Odpowiedzi</h4>
						<InputAnswers
							answers={answers}
							handleCheckboxChange={handleCheckboxChange}
							handleAnswerTextChange={handleAnswerTextChange}
						/>

						<ReturnButton
							onClick={() => setVisible(prevState => !prevState)}
							text={"Cofnij"}
						/>
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
