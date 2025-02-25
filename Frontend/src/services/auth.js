import api from "./index";

const register = async ({
  birthday,
  email,
  firstName,
  gender,
  lastName,
  password,
}) => {
  try {
    const { data } = await api.post("/auth/register", {
      birthday,
      email,
      firstName,
      gender,
      lastName,
      password,
    });
    return data.code;
  } catch (error) {
    console.error(error);
    console.error("Error al hacer register");
  }
};

const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", {
      email: email,
      password: password,
    });

    return data.token;
  } catch (error) {
    console.error("Error al hacer login");
    console.error(error);
    throw error;
  }
};

const profile = async (token) => {
  try {
    const { data } = await api.get("/auth/profile", {
      headers: {
        Authorization: token,
      },
    });
    return data.user;
  } catch (error) {
    console.error(error);
    console.error("Error al validar token");
  }
};

export { register, login, profile };
