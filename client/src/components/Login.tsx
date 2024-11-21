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
import { useLoginLazyQuery } from "../types/graphql-types";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [login] = useLoginLazyQuery();
  // const [login, loading, error] = useLoginLazyQuery();

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

  const handleLogin = async () => {
    const email =
      credentialsRef.email.current && credentialsRef.email.current.value;
    const password =
      credentialsRef.password.current && credentialsRef.password.current.value;

    await login({
      variables: { email: email as string, password: password as string },
    });
  };

  return (
    <>
      <Button variant="outlined" color="white" onClick={handleOpen}>
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
              onClick={handleLogin}
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
