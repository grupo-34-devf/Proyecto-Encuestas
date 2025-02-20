import { Route, Routes } from "react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "../pages/Verify";

import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "../components/NavBar";

const CustomRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/surveys" element={}>
          <Route path="/:id"  element={}/>
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* 
        /app		N/A	Mis encuestas
        /app/create		N/A	Crear nueva encuesta
        /app/surveys/:id		id: id de encuesta	Ver datos de encuesta
        /app/surveys/:id/results		id: id de encuesta	Ver resultados de encuesta
        /app/surveys/:id/edit		id: id de encuesta	Editar encuesta
        /profile		N/A	Mis datos de perfil
      */}
      </Routes>
    </>
  );
};

export default CustomRouter;
