import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/layouts/Layout";
import Home from "./Pages/Client/home";
import Login from "./Pages/Auth/login";


export default function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Layout />}>
            <Route  index element={<Home />} />
            <Route  path="/plante" element={<Plante />} />
            <Route  path="/categorise" element={<Categorise />} />
            <Route  path="/profile" element={<Profile />} >
              <Route  index element={<Information />} />
              <Route  path="/commande" element={<Commande />} />
            </Route>
          </Route>
          <Route  path="/login" element={<Login />} />
          <Route  path="/register" element={<Register />} /> 
          <Route  path="/dashboard" element={<Plante />} >
            <Route  index element={<Statistiques />} />
            <Route  path="/plante" element={<Plante />} />
            <Route  path="/user" element={<Users />} />
            <Route  path="/commande" element={<Commande />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
