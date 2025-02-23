import { Dispatch, SetStateAction } from "react";

export interface Answer {
	answer: string;
	value: boolean;
}

export interface QuizQuestion {
	question: string;
	answers: Answer[];
	id: string;
}

export interface Quiz {
	id: string;
	title: string;
	questions: QuizQuestion[];
}

export interface Question {
	questions: [];
	question: string;
	answers: Answer[];
}

export interface AnsweredQuestion {
	question: string;
	selectedAnswer: string | null;
	correctAnswer: Answer;
}

export interface CurrentReviewQuestionProps {
	currentQuestion: QuizQuestion;
	handleAnsweredChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ReturnButtonProps {
	onClick: () => void;
	text: string;
}

export interface NextorFinishButtonProps {
	currentQuestionIndex: number;
	onClick: () => void;
	questions: QuizQuestion[];
}

export interface RepeatQuizButtonProps {
	onClick: () => void;
}

export interface AddQuestionProps {
	fetchQuestions: () => void;
	setQuizCompleted: Dispatch<SetStateAction<boolean>>;
	setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
	setScore: Dispatch<SetStateAction<number>>;
}

export interface InputAnswersProps {
	answers: Answer[];
	handleCheckboxChange: (index: number) => void;
	handleAnswerTextChange: (index: number, newText: string) => void;
}

export interface DeleteQuestionProps {
	fetchQuestions: () => void;
	questions: QuizQuestion[];
}
