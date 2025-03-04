import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.routes.js";
import surveyRouter from "./routes/survery.routes.js";

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
api.use("/surveys", surveyRouter);

export default api;
