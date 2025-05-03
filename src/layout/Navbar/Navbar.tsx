import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className='text-center p-20px text-[25px] '>
            <Link to="/">Dostępne Quizy</Link>
		</nav>
	);
};
