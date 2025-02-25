import { createContext, useContext, useState } from "react";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  /**
   * {
   *  content
   *  severity
   *  timeoutId
   * }
   */
  const [alerts, setAlerts] = useState([]);

  /**
   * error
   * success
   * info
   * warning
   */

  const showAlert = (content, severity, duration = 4000) => {
    //Crear nueva alerta
    const newAlert = {
      content,
      severity,
      duration,
    };

    // Agregar alerta al arreglo de alertas
    setAlerts((prev) => [...prev, newAlert]);

    // Generar un id único usando el setTimeout
    const timeoutId = setTimeout(() => {
      setAlerts((prevAlerts) => {
        return prevAlerts.filter((alert) => {
          return alert.timeoutId != timeoutId;
        });
      });
    }, duration);

    // Actualuizar la alerta con el id del timeout
    setAlerts((prevAlerts) => {
      return prevAlerts.map((alert, index) => {
        return index == prevAlerts.length - 1
          ? {
              ...alert,
              timeoutId,
            }
          : alert;
      });
    });
  };

  const closeAlert = (timeoutId) => {
    clearTimeout(timeoutId);
    setAlerts((prevAlerts) => {
      return prevAlerts.filter((alert) => {
        return alert.timeoutId != timeoutId;
      });
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 2000,
          width: "auto",
        }}
      >
        {alerts.map((alert, index) => (
          <Fade key={index} timeout={500} in={true}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    closeAlert(alert.timeoutId);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity={alert.severity}
            >
              {alert.content}
            </Alert>
          </Fade>
        ))}
      </Box>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
