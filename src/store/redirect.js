import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { create } from "zustand";

const useRole = create((set) => ({
    role: null,

    setRole: (userRole) => {
        set({role: userRole});
    }, 

    setRoleFromToken: (token) => {
        try {
            const decodeToken = jwtDecode(token);
            set({role: decodeToken.role});
        } catch (error) {
            Swal.fire ({
                icon: 'error',
                title: 'Décodage du token',
                text: "Erreur de décodage du token : " + error,
                confirmButtonText: 'Ok',
            });
        }
    },

    redirectToRolePage: (pageRole = null) => {
        const role = useRole.getState().role;
        
        if (!pageRole) {
            return;
        }
        
        if (pageRole !== role) {
            switch (role) {
                case 'admine':
                    window.location.href = "/admin";
                    break;
                
                case 'employe':
                    window.location.href = "/employe";
                    break;
    
                case 'client':
                    window.location.href = "/";
                    break;
            
                default:
                    window.location.href = "/auth";
                    break;
            }
        }
    }

}));

export default useRole;



