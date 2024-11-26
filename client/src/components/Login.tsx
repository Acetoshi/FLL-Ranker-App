import { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { RefMap } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const { notifySuccess } = useNotification();

  const credentialsRef: RefMap = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //TODO : write a function that checks if fields aren't empty

  const submitLogin = async () => {
    setLoading(true);

    const email =
      credentialsRef.email.current && credentialsRef.email.current.value;
    const password =
      credentialsRef.password.current && credentialsRef.password.current.value;

    const { success, userDetails } = await handleLogin(email as string, password as string);

    if (success) {
      handleClose();
      notifySuccess(`Vous êtes connecté en tant que ${userDetails?.firstname} ${userDetails?.lastname}`)
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="outlined" color="changeIt" onClick={handleOpen}>
        Se Connecter
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Connexion</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              inputRef={credentialsRef.email}
              label={"email"}
              variant={"outlined"}
              fullWidth
              required
            />
            <TextField
              inputRef={credentialsRef.password}
              variant={"outlined"}
              label={"password"}
              type="password"
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              maxWidth: 200,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={submitLogin}
              autoFocus
            >
              Se connecter
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              ANNULER
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
