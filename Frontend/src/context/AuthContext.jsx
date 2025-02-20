import { createContext, useState, useContext } from "react";

import { useNavigate } from "react-router";
import { login as loginService } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken;
  });

  const login = async ({ email, password }) => {
    const tokenResponse = await loginService(email, password);

    localStorage.setItem("token", tokenResponse);
    setToken(tokenResponse);
    navigate("/profile");
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
