import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";

console.log("ENVIRONMENT", process.env.NODE_ENV);

const api = express();

if (process.env.NODE_ENV === "development") {
  api.use(morgan("dev"));
}

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
