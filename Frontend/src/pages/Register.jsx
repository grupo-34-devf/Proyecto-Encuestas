import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useState } from "react";
import { register } from "../services/auth";
import { useAlert } from "../context/AlertContext";

const Register = () => {
  const { showAlert } = useAlert();

  const [loadingButton, setLoadingButton] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerUser = async () => {
      try {
        setLoadingButton(true);
        await register(formData);
        showAlert("Usuario registrado satisfactoriamente", "success");
      } catch (error) {
        console.log(error);

        showAlert("Error al registrar nuevo usuario", "error");
      } finally {
        setLoadingButton(false);
      }
    };

    registerUser();
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h2" align="center">
          Registro nuevo usuario
        </Typography>

        <TextField
          required
          type="text"
          label="Nombre(s)"
          onChange={handleChange}
          value={formData.firstName}
          name="firstName"
          data-cy="firstNameInput"
          disabled={loadingButton}
        />
        <TextField
          required
          type="text"
          label="Apellido(s)"
          onChange={handleChange}
          value={formData.lastName}
          name="lastName"
          data-cy="lastNameInput"
          disabled={loadingButton}
        />
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-birthday">
            Nacimiento
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Nacimiento"
            type="date"
            onChange={handleChange}
            value={formData.birthday}
            name="birthday"
            data-cy="birthdayInput"
            disabled={loadingButton}
          />
        </FormControl>
        <TextField
          required
          type="email"
          label="Correo"
          onChange={handleChange}
          value={formData.email}
          name="email"
          data-cy="emailInput"
          disabled={loadingButton}
        />

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={formData.password}
            name="password"
            data-cy="passwordInput"
            disabled={loadingButton}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <TextField
          required
          type="text"
          label="Género"
          onChange={handleChange}
          value={formData.gender}
          name="gender"
          data-cy="genderInput"
          disabled={loadingButton}
        />
        <Button
          type="submit"
          variant="contained"
          data-cy="registerSubmitButton"
          onClick={handleRegister}
          loading={loadingButton}
        >
          Registrarme
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
