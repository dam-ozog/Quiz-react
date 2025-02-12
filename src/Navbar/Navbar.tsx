import { Link } from "react-router-dom";


export const Navbar = () => {
    return(
        <nav className="text-center mb-[20px] p-[20px]">
            <ul>
                <li>
                    <Link to="/quiz">Główny QUIZ</Link>
                    <br />
                    <Link to="/">Strona Główna</Link>
                </li>
            </ul>
        </nav>
    )
};