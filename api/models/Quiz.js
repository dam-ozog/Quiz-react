import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            answer: { type: String, required: true },
            value: { type: Boolean, required: true },
        },
    ],
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;


