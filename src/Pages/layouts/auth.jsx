import { Link, Outlet } from "react-router-dom";
import logo from '../../assets/react.svg';

export default function Auth() {
    return (
        <>
            <header className="bg-emerald-400 w-full h-16 px-10 flex justify-center items-center">
                <nav>
                    <Link to='/auth' >
                        <img src={logo} alt="Logo" />
                    </Link>
                </nav>
            </header>
            <main className="flex flex-col justify-center">
                <Outlet />
            </main>
        </>
    )
}