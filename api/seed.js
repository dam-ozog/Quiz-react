import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "./models/Quiz.js"; // Import modelu Quiz

dotenv.config({ path: "../.env" });

const DB_URL = process.env.URL;

if (!DB_URL) {
  console.error(`MongoDB URL is not defined. Set URL environment variable.`);
  process.exit(1);
}

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connection successful...");
    // Tutaj dodaj logikę seedowania
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });

const quizzes = [
    {
        title: "Quiz o Wszystkim",
        questions: [
            {
                question: "Co żyje 100 lat?",
                answers: [
                    { answer: "Kot", value: false },
                    { answer: "Człowiek", value: false },
                    { answer: "Żółw", value: true },
                ],
                selectedAnswer: "",
            },
            {
                question: "Co oddycha pod wodą?",
                answers: [
                    { answer: "Nietoperz", value: false },
                    { answer: "Ryba", value: true },
                    { answer: "Wilk", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "Ile dni ma rok?",
                answers: [
                    { answer: "320", value: false },
                    { answer: "365", value: true },
                    { answer: "410", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "Ile kół ma rower?",
                answers: [
                    { answer: "3", value: false },
                    { answer: "2", value: true },
                    { answer: "12", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "W co gramy?",
                answers: [
                    { answer: "CS", value: true },
                    { answer: "LOL", value: true },
                    { answer: "DOTA", value: true },
                ],
                selectedAnswer: "",
            },
        ],
    },
    {
        title: "Quiz o grach",
        questions: [
            {
                question: "Która firma stworzyła grę 'Minecraft'?",
                answers: [
                    { answer: "Mojang", value: true },
                    { answer: "Electronic Arts", value: false },
                    { answer: "Ubisoft", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "W jakim gatunku gier mieści się 'The Witcher 3: Wild Hunt'?",
                answers: [
                    { answer: "RPG", value: true },
                    { answer: "FPS", value: false },
                    { answer: "MOBA", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "Która gra była jedną z pierwszych popularnych battle royale?",
                answers: [
                    { answer: "PUBG", value: true },
                    { answer: "Fortnite", value: false },
                    { answer: "Call of Duty: Warzone", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "W której grze można znaleźć postać o imieniu Kratos?",
                answers: [
                    { answer: "God of War", value: true },
                    { answer: "Dark Souls", value: false },
                    { answer: "Assassin's Creed", value: false },
                ],
                selectedAnswer: "",
            },
            {
                question: "Która seria gier słynie z ekstremalnego poziomu trudności?",
                answers: [
                    { answer: "Dark Souls", value: true },
                    { answer: "The Sims", value: false },
                    { answer: "Need for Speed", value: false },
                ],
                selectedAnswer: "",
            }
        ],
    },
];

const seedDB = async () => {
    await Quiz.deleteMany({}); // Usunięcie starych quizów
    await Quiz.insertMany(quizzes); // Dodanie nowych quizów
    console.log("✅ Quizy dodane do bazy!");
    mongoose.connection.close();
};

seedDB();

