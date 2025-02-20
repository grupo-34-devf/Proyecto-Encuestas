import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    login(formData)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        alert("error login");
        console.error(error);
      });
  };

  return (
    <>
      <form>
        <label htmlFor="email">Correo</label>
        <input
          type="email"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        <br />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
