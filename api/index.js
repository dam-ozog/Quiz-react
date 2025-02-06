// import express from "express";
// import cors from "cors";

// const app = express();
// const PORT = 5000;

// const questions = [
// 	{
// 		question: "Co żyje 100 lat?",
// 		answers: [
// 			{ answer: "Kot", value: false },
// 			{ answer: "Człowiek", value: false },
// 			{ answer: "Żółw", value: true },
// 		],
// 		id: "3e25",
// 	},
// 	{
// 		question: "Co oddycha pod wodą?",
// 		answers: [
// 			{ answer: "Nietoperz", value: false },
// 			{ answer: "Ryba", value: true },
// 			{ answer: "Wilk", value: false },
// 		],
// 		id: "be86",
// 	},
// 	{
// 		question: "20 + 20",
// 		answers: [
// 			{ answer: "40", value: true },
// 			{ answer: "60", value: false },
// 			{ answer: "35", value: false },
// 		],
// 		id: "78ee",
// 	},
// ];

// app.use(cors());
// app.use(express.json());

// app.get("/questions", (req, res) => {
// 	res.json(questions);
// });

// app.post("/questions", (req, res) => {
// 	const newQuestion = req.body;

// 	if (
// 		!newQuestion.question ||
// 		!Array.isArray(newQuestion.answers) ||
// 		newQuestion.answers.length < 3
// 	) {
// 		return res.status(400).json({ error: "Nieprawidłowe dane pytania" });
// 	}

// 	questions.push(newQuestion);

// 	console.log("nowe pytanie dodane");
// 	res.status(201).json({ message: "Pytanie zostało zapisane" });
// });

// app.listen(PORT, () => {
// 	console.log(`Backend server is running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
// import fs from "fs";
// import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
// const DB_PATH = path.resolve("backend/db.json"); // Ścieżka do pliku db.json

app.use(cors());
app.use(express.json());

let questions = [
	{
		question: "Co żyje 100 lat?",
		answers: [
			{ answer: "Kot", value: false },
			{ answer: "Człowiek", value: false },
			{ answer: "Żółw", value: true },
		],
		id: "3e25",
	},
	{
		question: "Co oddycha pod wodą?",
		answers: [
			{ answer: "Nietoperz", value: false },
			{ answer: "Ryba", value: true },
			{ answer: "Wilk", value: false },
		],
		id: "be86",
	},
	{
		question: "Ile dni ma rok?",
		answers: [
			{ answer: "320", value: false },
			{ answer: "365", value: true },
			{ answer: "410", value: false },
		],
		id: "a123",
	},
	{
		question: "Ile kół ma rower?",
		answers: [
			{ answer: "3", value: false },
			{ answer: "2", value: true },
			{ answer: "12", value: false },
		],
		id: "b456",
	},
	{
		question: "Ile dni ma rok?",
		answers: [
			{ answer: "365", value: true },
			{ answer: "260", value: false },
			{ answer: "420", value: false },
		],
		id: "c789",
	},
	{
		question: "W co gramy?",
		answers: [
			{ answer: "CS", value: true },
			{ answer: "LOL", value: true },
			{ answer: "DOTA", value: true },
		],
		id: "d101",
	},
];

// Helper function to read data from db.json
// const readDataFromFile = () => {
//     try {
//         const data = fs.readFileSync(DB_PATH, "utf8");
//         return JSON.parse(data).questions;
//     } catch (error) {
//         console.error("Error reading db.json:", error.message);
//         return [];
//     }
// };

// // Helper function to write data to db.json
// const writeDataToFile = (questions) => {
//     try {
//         const dbData = { questions };
//         fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), "utf8");
//     } catch (error) {
//         console.error("Error writing to db.json:", error.message);
//     }
// };

// GET endpoint to fetch questions from db.json
app.get("/api/questions", (req, res) => {
	res.json(questions);
});

// POST endpoint to add a new question to db.json
app.post("/api/questions", (req, res) => {
	const newQuestion = req.body;

	if (
		!newQuestion.question ||
		!Array.isArray(newQuestion.answers) ||
		newQuestion.answers.length < 3
	) {
		return res.status(400).json({ error: "Nieprawidłowe dane pytania" });
	}

	// const questions = readDataFromFile();
	questions.push(newQuestion);
	// writeDataToFile(questions);

	console.log("Nowe pytanie dodane:", newQuestion);
	res.status(201).json({ message: "Pytanie zostało zapisane" });
});

app.delete("/api/questions", (req, res) => {
	const index = parseInt(req.body.index, 10) - 1; // Pobieramy indeks z body

	if (isNaN(index)) {
		return res.status(400).json({ error: "Invalid index" });
	}

	// const questions = readDataFromFile();

	if (index < 0 || index >= questions.length) {
		return res.status(404).json({ error: "Question not found" });
	}
	const questionDelete = questions.filter(q => q.index === index);

	questions.splice(index, 1);
	// writeDataToFile(questions);

	console.log(`Pytanie o numerze ${index} zostało usunięte`, questionDelete);
	res.status(200).json({ message: "Question deleted" });
});

app.listen(PORT, () => {
	console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default app;
