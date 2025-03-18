import { QuizQuestion } from "../Types/Type";


export const updateSelectedAnswer = (questions: QuizQuestion[], questionId: string, answer: string): QuizQuestion[] => {
    return questions.map(q =>
        q._id === questionId ? { ...q, selectedAnswer: answer } : q
    );
};

export const checkAnswer = (questions: QuizQuestion[]): number => {
    let score = 0;
    questions.map(q => {
        const correctAnswer = q.answers.find(a => a.value === true);
        if (q.selectedAnswer === correctAnswer?.answer) {
           score++;
        }
    });
    return score;
};

export const resetAnswers = (questions: QuizQuestion[]): QuizQuestion[] => {
    return questions.map(q => ({
        ...q,
        selectedAnswer: "",
    }));
};