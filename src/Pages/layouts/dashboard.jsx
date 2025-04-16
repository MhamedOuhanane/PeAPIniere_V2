import { Outlet, Link } from "react-router-dom";
import logo from '../../assets/react.svg';
import { useEffect} from "react";
import useToken from "../../store/tokenUser";
import Sidebar from "../../components/sidebar";

export default function Dashboard() {
    const defaultPage = useToken((state) => state.defaultPage);
    const token = useToken((state) => state.token);
    const decodeToken = useToken((state) => state.decodeToken);
    const TokenDecode = useToken((state) => {state.decodeToken(token); state.decodeToken});
    
    useEffect(() => {
        decodeToken(token);
        defaultPage(token);
    }, [TokenDecode]);

    const imageUser = "photos/profile/default.jpg";
    
    return (
      <>
        <header className="absolute bg-emerald-400 w-full h-12 px-10 flex items-center">
          <nav className="flex justify-between items-center w-full">
            <Link to='/admin'>
              <img src={logo} alt="Logo" />
            </Link>
  
            <div className="h-auto flex space-x-2 overflow-hidden">
              {imageUser ? (
                <img src={imageUser} className="h-full w-full self-center rounded-full object-cover" alt="Avatar" />
              ) : (
                <span className="text-sm self-center text-gray-500">Chargement...</span>
              )}

              <div className="flex flex-col">
                <h2>{TokenDecode.fullName}</h2>
                <span className="text-gray-800 text-sm self">Admin</span>
              </div>
            </div>
          </nav>
        </header>
   
        <main className="flex h-screen pt-12">
          <Sidebar />  
          <div className="flex-1 overflow-auto p-4">
            <Outlet />
        </div>
        </main>
      </>
    );
}