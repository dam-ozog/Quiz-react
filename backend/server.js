import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

const questions = [
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
		question: "20 + 20",
		answers: [
			{ answer: "40", value: true },
			{ answer: "60", value: false },
			{ answer: "35", value: false },
		],
		id: "78ee",
	},
];

app.use(cors());
app.use(express.json());

app.get("/questions", (req, res) => {
	res.json(questions);
});

app.post("/questions", (req, res) => {
	const newQuestion = req.body;

	if (
		!newQuestion.question ||
		!Array.isArray(newQuestion.answers) ||
		newQuestion.answers.length < 3
	) {
		return res.status(400).json({ error: "Nieprawidłowe dane pytania" });
	}

	questions.push(newQuestion);

	console.log("nowe pytanie dodane");
	res.status(201).json({ message: "Pytanie zostało zapisane" });
});

app.listen(PORT, () => {
	console.log(`Backend server is running on http://localhost:${PORT}`);
});