import { createContext, useContext, useState } from "react";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  /**
   * error
   * success
   * info
   * warning
   */

  const showAlert = (content, severity, duration = 2000) => {
    setAlertSeverity(severity);
    setAlertContent(content);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Fade timeout={500} in={open}>
        <Alert
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 2000,
            width: "auto",
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={alertSeverity}
        >
          {alertContent}
        </Alert>
      </Fade>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
