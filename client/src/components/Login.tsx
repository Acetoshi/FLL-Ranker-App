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

export default function Login() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
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
          <Box         sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection:"column",
          gap: "16px",
        }}>
            <TextField
              inputRef={credentialsRef.email}
              label={"email"}
              variant={"outlined"}
              fullWidth
              required
            />
            <TextField
              // inputRef={inputRef}
              inputRef={credentialsRef.password}
              variant={"outlined"}
              label={"password"}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => 1}>
            ANNULER
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => 1}
            autoFocus
          >
            Se connecter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
