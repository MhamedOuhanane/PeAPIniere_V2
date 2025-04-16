import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/layouts/auth";
import Login from "./Pages/Auth/login";
import Logout from "./Pages/Auth/logout";
import Dashboard from "./Pages/layouts/dashboard";
import TableBord from "./Pages/admin/dashbord";
import CategoryManagement from "./components/Dashboard Admin/CategoryManagement";
import Register from "./Pages/Auth/register";
import PlantManagement from "./Pages/admin/PlantManagement";


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
            <Route  path="plantes" element={<PlantManagement />} />
            <Route  path="categories" element={<CategoryManagement />} />
            {/* <Route  path="users" element={<Users />} /> */}
            {/* <Route  path="commandes" element={<Commande />} /> */}
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
