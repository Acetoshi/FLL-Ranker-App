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
import { useNavigate } from "react-router";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const { notifySuccess } = useNotification();
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

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
      if (userDetails?.role === "Organisateur") {
        navigate("/manage/competitions");
      } else if (userDetails?.role === "Juré") {
        navigate("/juries");
      }
    } else {
      setInputError(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ //TODO : this needs to be refactored into theme to be more DRY
          color: "white", // Set text color to white
          borderColor: "white", // Set border color to white
        }}
        onClick={handleOpen}
      >
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
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            Connexion
            <IconButton sx={{ padding: 0 }} onClick={handleClose}>
              <CloseIcon />
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
