import { useState } from "react";
import { InputAnswers } from "../InputAnswers/InputAnswers";
import { ReturnButton } from "../ReturnButton/ReturnButton";
import { AddQuestionProps } from '../../Types/Type';
import { useParams } from "react-router-dom";

const AddQuestion: React.FC<AddQuestionProps> = ({ fetchQuizzes, setQuizCompleted, setCurrentQuestionIndex, setScore }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [questionText, setQuestionText] = useState<string>("");
	const [answers, setAnswers] = useState([
		{ answer: "", value: false },
		{ answer: "", value: false },
		{ answer: "", value: false },
	]);
	const { id } = useParams();

	const API_BASE_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:5000/api"
			: "/api";

	// Funkcja do aktualizacji tekstu odpowiedzi
	const handleAnswerTextChange = (index: number, newText: string) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].answer = newText;
		setAnswers(updatedAnswers);
	};

	// Funkcja do obsługi zmiany checkboxa
	const handleCheckboxChange = (index: number) => {
		const updatedAnswers = answers.map((answer, i) => ({
			...answer,
			value: i === index,
		}));
		setAnswers(updatedAnswers);
	};

	const quizId = id;

	const SaveQuestion = async (e: React.FormEvent) => {
		e.preventDefault();
		if (questionText && answers.length >= 3) {
			try {
				const response = await fetch(`${API_BASE_URL}/quizzes/${id}/questions`, {
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
					fetchQuizzes();
					setQuizCompleted(false);
					setScore(0);
					setCurrentQuestionIndex(0);
					alert("Pytanie zostało dodane")
				} else {
					console.error("Błąd podcas zapisywania pytania");
				}
			} catch (error) {
				console.error("Wystąpił błąd", error);
			}
		}
	};

	const handleDisabledButton = (): boolean => {
		return (
			questionText.trim() === "" ||
			answers.filter(answer => answer.value).length !== 1 ||
			answers.some(answer => answer.answer.trim() === "")
		);
	}

	return (
		<div className="max-w-[350px] m-auto mb-[20px] mt-[40px]">
			{!visible && (
				<button className="btn btn-outline btn-success w-[200px]" onClick={() => setVisible(true)}>Dodaj nowe pytanie</button>
			)}
			{visible && (
				<form onSubmit={SaveQuestion}>
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
						<h4 className="p-[10px] underline underline-offset-2">Odpowiedzi:</h4>
						<InputAnswers
							answers={answers}
							handleCheckboxChange={handleCheckboxChange}
							handleAnswerTextChange={handleAnswerTextChange}
						/>

						<ReturnButton
							onClick={() => setVisible(false)}
							text={"Cofnij"}
						/>
						<button
							className="btn btn-outline ml-[10px]"
							disabled={handleDisabledButton()}
							type='submit'
							>
							Zapisz pytanie
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default AddQuestion;
