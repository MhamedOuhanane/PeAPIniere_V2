import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useToken from "../../store/tokenUser";

export default function Login(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    
    const [errors, setErrors] = useState({});
    const setToken = useToken((state) => state.setToken);
    const defaultPage = useToken((state) => state.defaultPage);
    const token = useToken((state) => state.token);
    

    defaultPage(token, 'visiteur');

    async function handleLogin(event) {
        event.preventDefault();

        const res = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(formData),
        });
        
        const data = await res.json();
        if (data.errors) {
            setErrors(data.errors);
        } else if (!res.ok) {
            const message = data.message ? data.message : data.error; 
            
            Swal.fire({
                icon: 'error',
                title: 'Erreur de connexion',
                text: message ,
                color: 'red',
                confirmButtonText: 'Ok',
            });
        } else {
            setToken(data.token);
            defaultPage(token, 'visiteur');
        }
        
    }

    return (
        <>
            <div className="h-32 flex justify-center items-center">
                <h2 className="text-green-800 text-2xl">{props.title}</h2>
            </div>
            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-7 flex flex-col justify-center bg-green-50 py-14 rounded-xl" >
                <div className="flex flex-col items-center">
                    <input type="email" placeholder="Email" 
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, email: eve.target.value})}
                        // value={formData['email']}
                    />
                    {errors.email && <p className="errors">{errors.email}</p>}
                </div>
                <div className="flex flex-col items-center">
                    <input type="password" placeholder="Password"
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, password: eve.target.value})}
                        // value={formData['password']}
                    />
                    {errors.password && <p className="errors">{errors.password}</p>}
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <button type="submit" className="bg-emerald-300 text-green-500 w-1/2">Connexion</button>
                    <span>Vous n'avez pas de compte ?  <Link to='register' >Inscrivez-vous</Link></span>
                </div>
            </form>
        </>
    );
}