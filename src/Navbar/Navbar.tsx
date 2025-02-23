import { Link } from "react-router-dom";
import WhichQuiz from "../WhichQuiz/WhichQUiz";

export const Navbar = () => {
	return (
		<nav className='text-center mb-[20px] p-[20px]'>
            <Link to="/">Dostępne Quizy</Link>
            {/* <WhichQuiz /> */}
		</nav>
	);
};
