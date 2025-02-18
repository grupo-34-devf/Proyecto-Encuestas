import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <NavLink to="/login">Login</NavLink>
      <br />
      <NavLink to="/register">Register</NavLink>
      <br />
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
};

export default Home;
