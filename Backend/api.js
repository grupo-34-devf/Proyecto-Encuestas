import express from "express";
import authRouter from "./routes/auth.routes.js";

const api = express();

api.get("/", (req, res) => {
  res.status(404).json({
    msg: "API Live!",
  });
});

//Acá van a registrar todas las rutas
api.use("/auth", authRouter);

export default api;
