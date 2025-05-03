import {
	defaultQuizStatistic,
	Quiz,
	QuizQuestion,
	QuizStatistic,
} from "../../Types/Type";

export const updateSelectedAnswer = (
	currentQuizQuestions: QuizQuestion[],
	questionId: string,
	answer: string
): QuizQuestion[] => {
	return currentQuizQuestions.map(q =>
		q._id === questionId ? { ...q, selectedAnswer: answer } : q
	);
};

const checkAnswer = (questions: QuizQuestion[]): number => {
	return questions.reduce((score, q) => {
		const correctAnswer = q.answers.find(a => a.value === true);
		return q.selectedAnswer === correctAnswer?.answer ? score + 1 : score;
	}, 0)
};

export const resetAnswers = (questions: QuizQuestion[]) => {
	return questions.map(q => ({
		...q,
		selectedAnswer: "",
	}));
};

export const handleNextQuestion = (
	currentQuiz: Quiz | undefined,
	quizInfo: QuizStatistic,
	setQuizInfo: React.Dispatch<React.SetStateAction<QuizStatistic>>
) => {
	if (!currentQuiz) {
		console.log("currentQuiz is undefined");
		return;
	}
	if (quizInfo.currentQuestionIndex < currentQuiz.questions.length - 1) {
		setQuizInfo(prev => ({
			...prev,
			currentQuestionIndex: prev.currentQuestionIndex + 1,
		}));
	} else {
		setQuizInfo({
			completed: true,
			currentQuestionIndex: 0,
			score: checkAnswer(currentQuiz.questions),
		});
	}
};

export const handleRepeatQuiz = (
	setQuizInfo: React.Dispatch<React.SetStateAction<QuizStatistic>>,
	currentQuiz: Quiz | undefined,
	setCurrentQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>
) => {
	setQuizInfo(defaultQuizStatistic);

	if (currentQuiz) {
		setCurrentQuiz({
			...currentQuiz,
			questions: resetAnswers(currentQuiz.questions),
		});
	}
};

export const handleAnsweredChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	currentQuiz: Quiz,
	currentQuestion: QuizQuestion | undefined,
	setCurrentQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>
) => {
	if (!currentQuiz || !currentQuestion) return;

	const updatedQuestions = updateSelectedAnswer(
		currentQuiz.questions,
		currentQuestion._id,
		e.target.value
	);

	setCurrentQuiz(prevQuiz => {
		if (!prevQuiz) return prevQuiz;
		return { ...prevQuiz, questions: updatedQuestions };
	});
};

export const handleReturnToBackAnswer = (
	setQuizInfo: React.Dispatch<React.SetStateAction<QuizStatistic>>
) => {
	setQuizInfo(prev => ({
		...prev,
		currentQuestionIndex: prev.currentQuestionIndex - 1,
	}));
};
