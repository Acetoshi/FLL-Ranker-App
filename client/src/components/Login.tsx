import { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RefMap } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const { notifySuccess } = useNotification();
  const [inputError, setInputError] = useState(false);

  const credentialsRef: RefMap = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const handleClose = () => {
    setOpen(false);
    setInputError(false);
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

    const { success, userDetails } = await handleLogin(
      email as string,
      password as string
    );

    if (success) {
      handleClose();
      notifySuccess(
        `Vous êtes connecté en tant que ${userDetails?.firstname} ${userDetails?.lastname}`
      );
    } else {
      setInputError(true);
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
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            Connexion
            <IconButton sx={{ padding: 0 }}>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </Box>
        </DialogTitle>
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
              error={inputError}
              onChange={() => setInputError(false)}
              fullWidth
              required
            />
            <TextField
              inputRef={credentialsRef.password}
              variant={"outlined"}
              label={"password"}
              type="password"
              error={inputError}
              onChange={() => setInputError(false)}
              helperText={inputError ? "Identifiants incorrects" : ""}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "24px",
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
        </DialogActions>
      </Dialog>
    </>
  );
}
