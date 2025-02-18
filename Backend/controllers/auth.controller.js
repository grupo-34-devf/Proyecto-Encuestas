import User from "../models/User.model.js";
import bcryp from "bcrypt";
import jwt from "jsonwebtoken";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const register = async (req, res) => {
  try {
    const { birthday, email, firstName, gender, lastName, password } = req.body;

    const newPassword = await bcryp.hash(password, 10);

    await User.create({
      birthday,
      email,
      firstName,
      gender,
      lastName,
      password: newPassword,
    });

    return res.status(201).json({
      code: "NewUser",
    });
  } catch (error) {
    //si es error causado por correo duplicado, regresar  {status: 409 code DuplicatedUser}

    return res.status(500).json({
      code: "ServerError",
    });
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const login = async (req, res) => {
  try {
    //Extraemos email y password del body
    const { email, password } = req.body;

    console.log(email, password, "controller");

    //Buscamos usuario con ese correo en la DB
    const user = await User.findOne({
      email,
    });

    //Si encuentra algún usuario
    if (user) {
      //Comprobar que la contraseña sea la misma que la encriptada
      const isPassword = await bcryp.compare(password, user.password);

      if (isPassword) {
        //Extraemos el secret de las varialbes de entorno para firmar el token
        const { JWT_SECRET } = process.env;

        //Lanzamos error si no está esa variable
        if (!JWT_SECRET) {
          throw new Error("JWT_SECRET missing in .env file");
        }

        //Payload para codificar el token
        const payload = {
          userId: user.id,
        };

        //Crear token firmado
        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.json({
          code: "LoginSuccess",
          token,
        });
      }
    }

    return res.status(401).json({
      code: "BadLogin",
    });
  } catch (error) {
    return res.status(500).json({
      code: "ServerError",
    });
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const profile = async (req, res) => {
  const token = req.headers["authorization"];

  console.log();

  if (!token) {
    return res.status(401).json({
      msg: "Missing token",
    });
  }

  try {
    //Extraemos el secret de las varialbes de entorno para firmar el token
    const { JWT_SECRET } = process.env;

    //Lanzamos error si no está esa variable
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing in .env file");
    }

    const { userId } = jwt.verify(token, JWT_SECRET, {});

    const user = await User.findById(userId, "-password -_id -__v");

    if (!user) {
      return res.status(403).json({ msg: "InvalidToken" });
    }

    return res.json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ msg: "InvalidToken" });
  }
};

export { register, login, profile };
