import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Notification } from "../types/types";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    // used for UI feedback
    const [notification,setNotification] = useState<Notification>({
      open: false,
      message: "",
      severity: "error",
    });

    const handleClose = () => {
      setNotification({ ...notification, open: false });
    };
  

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};