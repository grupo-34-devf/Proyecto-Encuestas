import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";

const api = express();

api.use(morgan("tiny"));

api.use(express.json());

api.use(
  cors({
    origin: "*",
  })
);

api.get("/", (req, res) => {
  res.status(404).json({
    msg: "API Live!",
  });
});

//Acá van a registrar todas las rutas
api.use("/auth", authRouter);

export default api;
