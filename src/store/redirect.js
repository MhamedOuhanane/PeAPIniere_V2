import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { create } from "zustand";

const useRole = create((set) => {
    role: null,
    setRoleFromToken: (token) => {
        try {
            const decodeToken = jwtDecode(token);
            set({role: decodeToken.role})
        } catch {
            Swal.fire (
                
            )
        }
    }
})

