import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 3,
    });

    const [errors, setErrors] = useState({});
    
    async function handleRegister(event) {
        event.preventDefault();

        const res = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else if (!res.ok) {
            console.log(data.message);
        } else {
            console.log(data);
        }
            
    }

    return (
        <>
            <div className="h-20 flex justify-center items-center">
                <h2 className="text-green-800 text-2xl">{props.title}</h2>
            </div>
            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-5 flex flex-col justify-center bg-green-50 py-8 rounded-xl" >
                <div className="flex flex-col items-center">
                    <input type="text" placeholder="First Name" 
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, first_name: eve.target.value})}
                    />
                    {errors.first_name && <p className="errors">{errors.first_name}</p>}
                </div>
                <div className="flex flex-col items-center">
                    <input type="text" placeholder="Last Name" 
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, last_name: eve.target.value})}
                    />
                    {errors.last_name && <p className="errors">{errors.last_name}</p>}
                </div>
                <div className="flex flex-col items-center">
                    <input type="email" placeholder="Email" 
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, email: eve.target.value})}
                    />
                    {errors.email && <p className="errors">{errors.email}</p>}
                </div>
                <div className="flex flex-col items-center">
                    <input type="password" placeholder="Mot de passe"
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, password: eve.target.value})}
                    />
                    {errors.password && <p className="errors">{errors.password}</p>}
                </div>
                <div className="flex flex-col items-center">
                    <input type="password" placeholder="Confermer le mot de passe" 
                        className="px-1" 
                        onChange={(eve) => setFormData({...formData, password_confirmation: eve.target.value})}
                    />
                    {errors.password_confirmation && <p className="errors">{errors.password_confirmation}</p>}
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <button type="submit" className="bg-emerald-300 text-green-500 w-1/2">Créer un compte</button>
                    <span>Vous avez déjà un compte ?   <Link to='/auth' >Se connecter</Link></span>
                </div>
            </form>
        </>
    );
}