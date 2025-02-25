import User from "../models/User.model.js";
import bcryp from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.utils.js";
import verifyEmialTemplate from "../utils/emails/verifyEmial.template.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const register = async (req, res) => {
  console.log(req.body);
  try {
    const { birthday, email, firstName, gender, lastName, password } = req.body;

    const newPassword = await bcryp.hash(password, 10);

    const newUser = await User.create({
      birthday,
      email,
      firstName,
      gender,
      lastName,
      password: newPassword,
    });

    const { JWT_SECRET } = process.env;

    //Lanzamos error si no está esa variable
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing in .env file");
    }

    const token = jwt.sign({ email: newUser.email }, JWT_SECRET);

    const verityURL = `http://localhost:8081/auth/verify?token=${token}`;

    await sendMail({
      from: "Equipo seguridad App",
      to: newUser.email,
      subject: "Valida tu correo electrónico",
      html: verifyEmialTemplate(newUser.fullName, verityURL),
    });

    return res.status(201).json({
      code: "NewUser",
    });
  } catch (error) {
    //si es error causado por correo duplicado, regresar  {status: 409 code DuplicatedUser}
    if (error.code == 11000) {
      return res.status(409).json({
        msg: "Usuario ya registrado",
      });
    }

    console.error(error);

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

    //Buscamos usuario con ese correo en la DB
    const user = await User.findOne({
      email,
    });

    //Si encuentra algún usuario
    if (user) {
      //Comprobar que la contraseña sea la misma que la encriptada
      const isPassword = await bcryp.compare(password, user.password);

      if (isPassword) {
        // Verificar si el usuario ya verificó su correo
        if (user.emailVerified) {
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
        } else {
          // Respondemos 403 si intenta inicar sesión sin correo verificado
          return res.status(403).json({
            msg: "Email not verified",
          });
        }
      }
    }

    return res.status(401).json({
      code: "BadLogin",
    });
  } catch (error) {
    console.error(error);

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

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const verify = async (req, res) => {
  // Conseguimos token de query params
  const token = req.query.token;

  // Si no hay token regresamos error
  if (!token) {
    return res.status(400).json({
      msg: "Token incorrecto",
    });
  }

  // Si sí hay token lo verificamos y extraemos el correo que viene dentro

  //Extraemos el secret de las varialbes de entorno para firmar el token
  const { JWT_SECRET } = process.env;

  //Lanzamos error si no está esa variable
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET missing in .env file");
  }

  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    user.emailVerified = true;

    await user.save();

    res.redirect("http://localhost:5173/login");
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      return res.status(400).json({
        msg: "Token inválido",
      });
    } else {
      console.error(error.name);
      return res.status(500).json({ msg: "Error al verificar correo" });
    }
  }
};

export { register, login, profile, verify };
