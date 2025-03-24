import { Quiz, QuizQuestion } from "../../Types/Type";


export const updateSelectedAnswer = (currentQuizQuestions: QuizQuestion[], questionId: string, answer: string): QuizQuestion[] => {
    return currentQuizQuestions.map(q =>
        q._id === questionId ? { ...q, selectedAnswer: answer } : q
    );
};

export const checkAnswer = (questions: QuizQuestion[]): number => { //zamień na reduce
    let score = 0;
    questions.forEach(q => {
        const correctAnswer = q.answers.find(a => a.value === true);
        if (q.selectedAnswer === correctAnswer?.answer) {
           score++;
        }
    });
    return score;
};

export const resetAnswers = (questions: QuizQuestion[]) => {
    return questions.map(q => ({
        ...q,
        selectedAnswer: "",
    }));
};