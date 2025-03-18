import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./connection.js"; // Połączenie z MongoDB
import Quiz from "./models/Quiz.js"; // Import modelu Quiz

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔹 GET - Pobierz wszystkie quizy
app.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
});

// 🔹 GET - Pobierz quiz po ID
// app.get("/api/quizzes/:id", async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.id);
//         if (!quiz) {
//             return res.status(404).json({ message: "Quiz nie znaleziony" });
//         }
//         res.json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: "Błąd serwera", error });
//     }
// });

// 🔹 POST - Dodaj nowe pytanie do quizu
app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    try {
        const { question, answers } = req.body;
        const { quizId } = req.params;

        if (!question || !Array.isArray(answers) || answers.length < 3) {
            return res.status(400).json({ error: "❌ Nieprawidłowe dane pytania" });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: "❌ Quiz nie znaleziony" });
        }

        quiz.questions.push({ question, answers });
        await quiz.save();

        res.status(201).json({ message: "Pytanie dodane", quiz });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
});

// 🔹 DELETE - Usuń pytanie z quizu
app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    try {
        const { quizId, questionId } = req.params;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz nie znaleziony" });
        }

        quiz.questions = quiz.questions.filter(q => q._id.toString() !== questionId);
        await quiz.save();

        res.status(200).json({ message: "Pytanie usunięte", quiz });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});

export default app;

