import { createContext, useState, useContext } from "react";

//Crear contexto de autenticación
const AuthContext = createContext();

//Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  //Todo lo que irá dentro del contexto que sea accesible para todos los compoenentes suscritos al contexto
  const [user, setUser] = useState(null);

  const login = (formData) => {
    console.log("Ejecutando login", formData);
    /**
     * 1.- Mandar llamar a la API /auth/login
     *
     * 2.- Si sale bien el login, guardar el token en localStorage
     *      y modificar el estado de user
     *
     * 3.- Si no sale bien el login enviar mensaje
     */
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
