import { createContext, useState, useContext } from "react";

import { login as loginService, profile } from "../services/auth";
// import { useNavigate } from "react-router";

//Crear contexto de autenticación
const AuthContext = createContext();

//Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  // useNavigate()
  //Todo lo que irá dentro del contexto que sea accesible para todos los compoenentes suscritos al contexto
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token;
  });

  const login = async (formData) => {
    try {
      // 1.- Mandar llamar a la API /auth/login
      const token = await loginService(formData.email, formData.password);

      // 2.- Si sale bien el login, guardar el token en localStorage
      localStorage.setItem("token", token);

      // 3.- Si no sale bien el login enviar mensaje

      // 4.- Si nos regrasan el token mandar llamar /profile y obtener al usuario
      const user = await profile(token);
      setUser(user);
    } catch (error) {
      console.error(error);
      console.error("Error en contexto login");
    }
  };

  const logout = () => {
    console.log("Ejecutando logout");

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
