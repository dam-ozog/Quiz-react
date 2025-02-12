import { useState } from "react";
import { ReturnButton } from "../ReturnButton/ReturnButton";
import { DeleteQuestionProps } from '../../Types/Type';

export const DeleteQuestion: React.FC<DeleteQuestionProps> = ({ fetchQuestions, questions }) => {
	const [showButton, setShowButton] = useState(true);
	const [deleteIndex, setDeleteIndex] = useState<number>(1);

	const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api"

	const handleShowButton = () => {
		setShowButton(prevState => !prevState);
	};

	const handleDeleteQuestion = async () => {
		// Sprawdzamy, czy wprowadzony indeks jest liczbą
		if (!deleteIndex || isNaN(deleteIndex)) {
			alert("Proszę wpisać poprawny numer indeksu");
			return;
		}

		const questionToDelete = questions[deleteIndex - 1];

		const response = await fetch(`${API_BASE_URL}/questions`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ index: deleteIndex }), // Wysyłamy numer indeksu
		});
		
		if (response.ok) {
			const data = await response.json();
			fetchQuestions();
			console.log("Pytanie zostało usunięte: ", questionToDelete.question);
			alert(`Pytanie o numerze ${deleteIndex} zostało usunięte`);
		} else {
			alert(`Nie znaleziono pytania o tym indeksie: ${deleteIndex}`)
			console.error("Błąd przy usuwaniu pytania:", response.status);
		}

		// Resetujemy stan po operacji
		setDeleteIndex(1);
		handleShowButton();
	};

	return (
		<div className="max-w-[200px] m-auto">
			{showButton && <button className="btn btn-outline btn-error" onClick={handleShowButton}>Usuń Pytanie</button>}
			{!showButton && (
				<div className="flex flex-col gap-[10px]">
					<label htmlFor=''>Wpisz numer indeksu pytania</label>
					<input
						value={deleteIndex}
						type='number'
						min={1}
						max={questions.length}
						onChange={e => setDeleteIndex(Number(e.target.value))}
						className="text-center input input-bordered w-full max-w-xs"
					/>
					<button className="btn btn-outline btn-warning" onClick={handleDeleteQuestion}>Usuń</button>
					<ReturnButton onClick={handleShowButton} text="Cofnij"/>
				</div>
			)}
		</div>
	);
};
