import { useState } from "react";
import { CustomButton } from "../../common/customButton/CustomButton";
import { DeleteQuestionProps } from "../../../Types/Type";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../constants/apiBaseUrl";

export const DeleteQuestion: React.FC<DeleteQuestionProps> = ({
	fetchQuizzes,
	quizzes,
}) => {
	const [showButton, setShowButton] = useState(true);
	const [deleteIndex, setDeleteIndex] = useState<number>(1);
	const { id } = useParams();

	const handleShowButton = () => {
		setShowButton(prevState => !prevState);
	};

	const handleDeleteQuestion = async () => {
		// Sprawdzamy, czy wprowadzony indeks jest liczbą
		if (!deleteIndex || isNaN(deleteIndex)) {
			alert("Proszę wpisać poprawny numer indeksu");
			return;
		}

		if (deleteIndex < 1 || deleteIndex > quizzes.length) {
			alert(
				`Nieprawidłowy numer indeksu. Quiz zawiera tylko ${quizzes.length} pytań`
			);
		}

		const questionId = quizzes[deleteIndex - 1]._id;
		const questionToDelete = quizzes[deleteIndex - 1];
		// const quizId = id;
		// console.log(quizId)

		const response = await fetch(
			`${API_BASE_URL}/quizzes/${id}/questions/${questionId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.ok) {
			fetchQuizzes();
			console.log("Pytanie zostało usunięte: ", questionToDelete.question);
			alert(`Pytanie o numerze ${deleteIndex} zostało usunięte`);
		} else {
			alert(`Nie znaleziono pytania o tym indeksie: ${deleteIndex}`);
			console.error("Błąd przy usuwaniu pytania:", response.status);
		}

		// Resetujemy stan po operacji
		setDeleteIndex(1);
		handleShowButton();
	};

	return (
		<div className='max-w-[200px] m-auto'>
			{showButton && (
				<CustomButton className="btn btn-outline btn-error w-[200px]" onClick={handleShowButton} text="Usuń pytanie"/>
			)}
			{!showButton && (
				<div className='flex flex-col gap-[10px]'>
					<label htmlFor=''>Wpisz numer pytania</label>
					<input
						value={deleteIndex}
						type='number'
						min={1}
						max={quizzes.length}
						onChange={e => setDeleteIndex(Number(e.target.value))}
						className='text-center input input-bordered w-full max-w-xs'
					/>
					<CustomButton className='btn btn-outline btn-warning'
						onClick={handleDeleteQuestion} text="Usuń"/>
					<CustomButton onClick={handleShowButton} className={"btn btn-outline"} text='Cofnij' />
				</div>
			)}
		</div>
	);
};
