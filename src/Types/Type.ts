import { Dispatch, SetStateAction } from "react";

export interface Answer {
	answer: string;
	value: boolean;
}

export interface QuizQuestion {
	question: string;
	answers: Answer[];
	_id: string;
	selectedAnswer: string;
}

export interface Quiz {
	length: number;
	_id: string;
	title: string;
	questions: QuizQuestion[];
}

export interface AnsweredQuestion {
	question: string;
	selectedAnswer: string | null;
	correctAnswer: Answer;
}

export interface CurrentReviewQuestionProps {
	currentQuestion: QuizQuestion | undefined;
	handleAnsweredChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	quizCompleted: boolean;
}

export interface CustomButtonProps {
	onClick?: () => void;
	text: string;
	className: string;
	type?: "submit" | "button" | "reset";
	disabled?: boolean;
	completed?: boolean
}

export interface NextorFinishButtonProps {
	currentQuestionIndex: number;
	onClick: () => void;
	quizzes: QuizQuestion[];
	quizCompleted: boolean;
}

export interface RepeatQuizButtonProps {
	onClick: () => void;
}

export interface AddQuestionProps {
	fetchQuizzes: () => void;
	setQuizInfo: Dispatch<SetStateAction<{completed: boolean,currentQuestionIndex: number,score: number}>>
}

export interface InputAnswersProps {
	answers: Answer[];
	handleCheckboxChange: (index: number) => void;
	handleAnswerTextChange: (index: number, newText: string) => void;
}

export interface DeleteQuestionProps {
	fetchQuizzes: () => void;
	quizzes: QuizQuestion[];
}

export interface QuizResultProps {
	quizCompleted: boolean;
	score: number;
	quizQuestions: QuizQuestion[];
}
