import { QuizApp } from "./QuizApp/QuizApp";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import QuizList from "./QuizList/QuizList";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<QuizList />} />
				<Route path='/:id' element={<QuizApp />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
