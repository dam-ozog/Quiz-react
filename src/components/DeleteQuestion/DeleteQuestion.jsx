/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { ReturnButton } from "../ReturnButton/ReturnButton";

export const DeleteQuestion = ({ fetchQuestions }) => {
	const [showButton, setShowButton] = useState(true);
	const [deleteIndex, setDeleteIndex] = useState(""); // Używamy numeru indeksu

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
			console.log("Pytanie zostało usunięte: ", data);
			alert(`Pytanie o indeksie ${deleteIndex} zostało usunięte`);
		} else {
			alert(`Nie znaleziono pytania o tym indeksie: ${deleteIndex}`)
			console.error("Błąd przy usuwaniu pytania:", response.status);
		}

		// Resetujemy stan po operacji
		setDeleteIndex("");
		handleShowButton();
	};

	return (
		<div className="max-w-[300px] m-auto">
			{showButton && <button className="btn btn-outline btn-error" onClick={handleShowButton}>Usuń Pytanie</button>}
			{!showButton && (
				<div className="flex flex-col gap-10">
					<label htmlFor=''>Wpisz numer indeksu pytania</label>
					<input
						value={deleteIndex}
						type='text'
						onChange={e => setDeleteIndex(e.target.value)}
						className="text-center"
					/>
					<button onClick={handleDeleteQuestion}>Usuń</button>
					<ReturnButton onClick={handleShowButton} text="Cofnij"/>
				</div>
			)}
		</div>
	);
};
