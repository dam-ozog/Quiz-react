import { QuizApp } from "./QuizApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./layout/Navbar/Navbar";
import QuizList from "./layout/QuizList/QuizList";

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
