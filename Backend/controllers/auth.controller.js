import User from "../models/User.model.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const register = async (req, res) => {
  return res.json({
    msg: "Hola",
  });
};

const login = async (req, res) => {};

export { register, login };
