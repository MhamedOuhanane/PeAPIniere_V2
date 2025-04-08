import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    return (
        <>
            <form className="w-1/2 mx-auto space-y-5" >
                <div>
                    <input type="email" placeholder="Email" 
                        onChange={(eve) => setFormData({...formData, email: eve.target.value})}
                        value={formData['email']}
                    />
                </div>
                <div>
                    <input type="password" placeholder="Password" 
                        onChange={(eve) => setFormData({...formData, password: eve.target.value})}
                        value={formData['password']}
                    />
                </div>
            </form>
        </>
    );
}