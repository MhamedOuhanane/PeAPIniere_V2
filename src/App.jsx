import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/layouts/auth";
import Login from "./Pages/Auth/login";
import Register from "./Pages/Auth/register";
import Dashboard from "./Pages/layouts/dashboard";
import TableBord from "./Pages/admin/dashbord";
import Logout from "./Pages/Auth/logout";


export default function App() {

  return (
    <BrowserRouter>
        <Routes>
          {/* <Route  path="/" element={<Layout />}> */}
            {/* <Route  index element={<Home />} /> */}
            {/* <Route  path="/plante" element={<Plante />} /> */}
            {/* <Route  path="/categorise" element={<Categorise />} /> */}
            {/* <Route  path="/profile" element={<Profile />} > */}
              {/* <Route  index element={<Information />} /> */}
              {/* <Route  path="/commande" element={<Commande />} /> */}
            {/* </Route> */}
          {/* </Route> */}
          <Route  path="/auth" element={<Auth />}>
            <Route  index element={<Login title='Connectez-vous à votre compte'/>} />
            <Route  path="register" element={<Register title='Créez votre compte' />} /> 
            <Route  path="logout" element={<Logout />} /> 
          </Route>
          <Route  path="/admin" element={<Dashboard />} >
            <Route  index element={<TableBord />} />
            {/* <Route  path="/plante" element={<Plante />} /> */}
            {/* <Route  path="/user" element={<Users />} /> */}
            {/* <Route  path="/categorise" element={<Categorise />} /> */}
            {/* <Route  path="/commande" element={<Commande />} /> */}
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
