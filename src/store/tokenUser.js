import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const redirectToRolePage = (role) => {
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
};

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

  defaultPage: (token = null, role = null) => {
    if (!role) {
        return;
    } 
    if (token) {
      const decoded = jwtDecode(token);
        console.log(decoded.role);
      if (decoded && decoded.role) {
        redirectToRolePage(decoded.role);
      } else {
        redirectToRolePage('visiteur');
      }
    } else {
      redirectToRolePage('visiteur');
    }
  }
}));

export default useToken;
