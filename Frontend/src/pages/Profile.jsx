import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
// import { profile } from "../services/auth";

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", user);
  };

  useEffect(() => {});

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Perfil de Usuario
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nombre"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Apellido"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Fecha de Nacimiento"
              name="birthday"
              type="date"
              value={user.birthday}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Género"
              name="gender"
              select
              value={user.gender}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Femenino</MenuItem>
              <MenuItem value="other">Otro</MenuItem>
            </TextField>
            <Button type="submit" variant="contained">
              Guardar Cambios
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
