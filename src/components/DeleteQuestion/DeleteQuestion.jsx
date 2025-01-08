/* eslint-disable react/prop-types */
import { useState } from "react";

export const DeleteQuestion = ({ setQuestions }) => {
	const [showButton, setShowButton] = useState(true);
	const [deleteIndex, setDeleteIndex] = useState(""); // Używamy numeru indeksu

	const handleShowButton = () => {
		setShowButton(prevState => !prevState);
	};

	const handleDeleteQuestion = async () => {
		// Sprawdzamy, czy wprowadzony indeks jest liczbą
		if (!deleteIndex || isNaN(deleteIndex)) {
			alert("Proszę wpisać poprawny numer indeksu");
			return;
		}

		const response = await fetch(`http://localhost:5000/questions/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ index: deleteIndex }), // Wysyłamy numer indeksu
		});

       if (response.ok) {
        const data = await response.json();
        console.log("Pytanie zostało usunięte: ", data);
        alert(`Pytanie o indeksie ${deleteIndex} zostało usunięte`)


        const updatedQUestionsResponse = await fetch("http://localhost:5000/questions");
        if(updatedQUestionsResponse.ok) {
            const updatedQuestions = await updatedQUestionsResponse.json();
            setQuestions(updatedQuestions);
        } else {
            console.error("Error downloading updated question list ")
        }
       } else {
        console.error("Błąd przy usuwaniu pytania:", response.status)
       }

		// Resetujemy stan po operacji
		setDeleteIndex("");
		handleShowButton();
	};

	return (
		<>
			{showButton && <button onClick={handleShowButton}>Usuń Pytanie</button>}
			{!showButton && (
				<div>
					<label htmlFor=''>Wpisz numer indeksu pytania</label>
					<input
						value={deleteIndex}
						type='text'
						onChange={e => setDeleteIndex(e.target.value)}
					/>
					<button onClick={handleDeleteQuestion}>Usuń</button>
				</div>
			)}
		</>
	);
};
