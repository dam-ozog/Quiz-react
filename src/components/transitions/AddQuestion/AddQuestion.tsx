import { useState } from "react";
import { InputAnswers } from "../InputAnswers/InputAnswers";
import { CustomButton } from "../../common/customButton/CustomButton";
import { AddQuestionProps } from "../../../Types/Type";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../constants/apiBaseUrl";

const AddQuestion: React.FC<AddQuestionProps> = ({
	fetchQuizzes,
	setQuizInfo,
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [questionText, setQuestionText] = useState<string>("");
	const [answers, setAnswers] = useState([
		{ answer: "", value: false },
		{ answer: "", value: false },
		{ answer: "", value: false },
	]);
	const { id } = useParams();

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

	const SaveQuestion = async (e: React.FormEvent) => {
		e.preventDefault();
		if (questionText && answers.length >= 3) {
			try {
				const response = await fetch(
					`${API_BASE_URL}/quizzes/${id}/questions`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							question: questionText,
							answers,
						}),
					}
				);
				if (response.ok) {
					setVisible(false);
					setQuestionText("");
					setAnswers([
						{ answer: "", value: false },
						{ answer: "", value: false },
						{ answer: "", value: false },
					]);
					fetchQuizzes();
					setQuizInfo({ completed: false, currentQuestionIndex: 0, score: 0 });
					alert("Pytanie zostało dodane");
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
	};

	return (
		<div className='max-w-[350px] m-auto mb-[20px] mt-[40px]'>
			{!visible && (
				<CustomButton
					className='btn btn-outline btn-success w-[200px]'
					onClick={() => setVisible(true)}
					text='Dodaj pytanie'
				/>
			)}
			{visible && (
				<form onSubmit={SaveQuestion}>
					<div>
						<div className='m-[10px]'>
							<label htmlFor='question'>Treść pytania:</label>
							<input
								type='text'
								value={questionText}
								onChange={e => setQuestionText(e.target.value)}
								placeholder='Wpisz treść pytania'
								className='input input-bordered input-primary w-full max-w-xs'
							/>
						</div>
						<h4 className='p-[10px] underline underline-offset-2'>
							Odpowiedzi:
						</h4>
						<InputAnswers
							answers={answers}
							handleCheckboxChange={handleCheckboxChange}
							handleAnswerTextChange={handleAnswerTextChange}
						/>

						<CustomButton
							onClick={() => setVisible(false)}
							className={"btn btn-outline"}
							text={"Cofnij"}
						/>
						<CustomButton
							className='btn btn-outline ml-[20px] w-[150px]'
							type='submit'
							disabled={handleDisabledButton()}
							text='Zapisz'
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default AddQuestion;
