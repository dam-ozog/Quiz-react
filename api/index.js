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
		id: "quiz1",
		title: "Quiz o Wszystkim",
		questions: [
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
		],
	},
	{
		id: "quiz2",
		title: "Quiz o grach",
		questions: [
			{
				question: "Skrót LOL oznacza?",
				answers: [
					{ answer: "Leauge of Legends", value: true },
					{ answer: "Leauge of  Liga", value: false },
					{ answer: "Like other Like", value: false },
				],
				id: "3e25",
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
		],
	},
];

const generateRandomId = () => {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	let id = "";
	for (let i = 0; i < 4; i++) {
		id += chars[Math.floor(Math.random() * chars.length)];
	}
	return id;
}

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
	const { question, answers, quizId } = req.body;

	const id = generateRandomId();

	const newQuestion = { question, answers, id };

	if (
		!newQuestion.question ||
		!Array.isArray(newQuestion.answers) ||
		newQuestion.answers.length < 3
	) {
		return res.status(400).json({ error: "Nieprawidłowe dane pytania" });
	}

	const quiz = questions.find(q => q.id === quizId);

	if (!quiz) {
		return res.status(404).json({ error: "Quiz nie znaleziony" });
	}
	console.log(quiz);
	console.log(newQuestion);

	// const questions = readDataFromFile();
	quiz.questions.push(newQuestion);
	// writeDataToFile(questions);

	console.log(`Nowe pytanie dodane do: ${quizId}`, newQuestion);
	res.status(200).json({ message: "Pytanie zostało zapisane" });
});

app.delete("/api/questions", (req, res) => {
	const { deleteIndex, quizId } = req.body;
	console.log("odebrane dane", deleteIndex, quizId);

	const questionIndex = parseInt(deleteIndex, 10) - 1;
	
	if (isNaN(questionIndex)) {
		return res.status(404).json({ error: "Invalid deleteIndex" });
	}

	const quiz = questions.find(q => q.id === quizId);
	console.log("znaleziony quiz", quiz)

	if (!quiz) {
		return res.status(404).json({ error: "Quiz not found: w quizach" });
	}
	// const questions = readDataFromFile();

	if (questionIndex < 0 || questionIndex >= quiz.questions.length) {
		return res.status(404).json({ error: "Question not found: brak indexu" });
	}
	quiz.questions.splice(questionIndex, 1);

	// quiz.questions.splice(deleteIndex, 1);
	// writeDataToFile(questions);

	console.log(`Pytanie o numerze ${deleteIndex} zostało usunięte`);
	res.status(200).json({ message: "Question deleted" });
});

app.listen(PORT, () => {
	console.log(`Backend server is running on http://localhost:${PORT}`);
});

export default app;
