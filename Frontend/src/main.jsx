import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";

import "./i18n.js";

import { createTheme, ThemeProvider } from "@mui/material";
import { AlertProvider } from "./context/AlertContext.jsx";

const customTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <AlertProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
