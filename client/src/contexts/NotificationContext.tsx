import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Snackbar, Alert } from "@mui/material";
import { Notification } from "../types/types";


interface NotificationContextType {
  value : Dispatch<SetStateAction<Notification>> | null
}

const NotificationContext = createContext<NotificationContextType>({value :null});

export default function NotificationProvider ({ children }: { children: ReactNode }){

  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <NotificationContext.Provider value={{setNotification}}>
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

export { NotificationContext };
