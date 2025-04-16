import { Outlet, Link } from "react-router-dom";
import logo from '../../assets/react.svg';
import { useEffect, useState } from "react";
import useToken from "../../store/tokenUser";

export default function Dashboard() {
    const [imageUrl, setImageUrl] = useState('');
    const defaultPage = useToken((state) => state.defaultPage);
    const token = useToken((state) => state.token);
    
    defaultPage(token);    

    const imageUser = token.photo;
    useEffect(() => {
    fetch('api/photo')
        .then(response => response.json())
        .then(data => setImageUrl(data.url));
    }, [imageUser]);

    return (
        <>
            <header className="bg-emerald-400 w-full h-16 px-10 flex items-center">
                <nav className="flex justify-between items-center w-full">
                    <Link to='/admin' >
                        <img src={logo} alt="Logo" />
                    </Link>

                    <div>
                        <img src={imageUrl} className="h-full w-full object-cover"  alt="Avatar" />
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}