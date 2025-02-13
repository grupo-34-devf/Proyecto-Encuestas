import express from "express";

const api = express();

api.get("/", (req, res) => {
  res.status(404).json({
    msg: "API Live!",
  });
});

export default api;
