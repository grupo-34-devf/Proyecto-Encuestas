import { Router } from "express";

const surveyRouter = Router();

surveyRouter.get("/", (req, res) => {
  res.json({ msg: "Esta es la ruta de encuestas" });
});

export default surveyRouter;
