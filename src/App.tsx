// import { useEffect, useState } from "react";
// // import "./App.css";
// import AddQuestion from "./components/AddQuestion/AddQuestion";
// import { ReapetQuizButton } from "./components/ReapetQuizButton/ReapetQuizButton";
// import { NextorFinishButton } from "./components/NextorFinishButton/NextorFinishButton";
// import { DeleteQuestion } from "./components/DeleteQuestion/DeleteQuestion";
// import { DownloadQuestions } from "./DownloadAPIHook/DowloadQuestions";
// import { ReturnButton } from "./components/ReturnButton/ReturnButton";
// import { CurrentReviewQuestion } from "./components/CurrentReviewQuestion/CurrentReviewQuestions";
// import { AnsweredQuestion } from "./Types/Type";
// import FirstPage from "./components/FirstPage/FirstPage";
import { QuizApp } from "./QuizApp/QuizApp";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import WhichQuiz from "./WhichQuiz/WhichQUiz";

function App() {
	return(
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<WhichQuiz />}/>
				{/* <Route path="/quiz" element={<QuizApp />}/> */}
				<Route path="/:id" element={<QuizApp />}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
