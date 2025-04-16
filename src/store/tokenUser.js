import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const useToken = create((set) => ({
  token: Cookies.get("token") || null,
  TokenDecode: null,

  setToken: (newToken) => {
    const decodeToken = jwtDecode(newToken);
    const expirationTokenDate = new Date(decodeToken.exp * 1000);

    document.cookie = `token=${newToken}; path=/; expires=${expirationTokenDate}; SameSite=Strict`;
    set({ token: newToken });
  },

  decodeToken: (token) => {
    try {
      const decodeToken = jwtDecode(token);
      set({ TokenDecode: decodeToken });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Décodage du token',
        text: "Erreur de décodage du token : " + error,
        confirmButtonText: 'Ok',
      });
    }
  },

  resetToken: () => {
    Cookies.remove("token");
    set({ token: null, TokenDecode: null });
  },

  defaultPage: (token = null) => {
    const currentPath = window.location.pathname;
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded?.role;
  
        if (role == 'admine' && currentPath != '/admin') {
          window.location.href = "/admin";
        } else if (role == 'employe' && currentPath != '/employe') {
          window.location.href = "/employe";
        } else if (role == 'client' && currentPath != '/') {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Token invalide: ", error);
        if (currentPath != '/auth') {
          window.location.href = "/auth";
        }
      }
    } else {
      if (currentPath != '/auth' && currentPath != '/auth/register') {
        window.location.href = "/auth";
      }
    }
  }
  
}));

export default useToken;
