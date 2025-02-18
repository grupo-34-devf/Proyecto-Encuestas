import { createContext, useState, useContext } from "react";

import { login as loginService, profile } from "../services/auth";

//Crear contexto de autenticación
const AuthContext = createContext();

//Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  //Todo lo que irá dentro del contexto que sea accesible para todos los compoenentes suscritos al contexto
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    console.log("Ejecutando login", formData);

    // 1.- Mandar llamar a la API /auth/login
    const token = await loginService(formData.email, formData.password);

    // 2.- Si sale bien el login, guardar el token en localStorage
    localStorage.setItem("token", token);

    // 3.- Si no sale bien el login enviar mensaje

    // 4.- Si nos regrasan el token mandar llamar /profile y obtener al usuario
    const user = await profile(token);

    setUser(user);
  };

  const logout = () => {
    console.log("Ejecutando logout");
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
