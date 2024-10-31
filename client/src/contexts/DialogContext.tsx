import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { createContext, useState, ReactNode } from "react";

interface DialogContextType {
  askUser: (question: string, informations: string) => Promise<boolean>;
}

const DialogContext = createContext<DialogContextType>();

export default function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const [dialogContent, setDialogContent] = useState({
    title: "Question ?",
    text: "Explications",
  });

  const [resolveUserDecision, setResolveUserDecision] = useState<
    ((decision:boolean) => void) | null
  >(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    if (resolveUserDecision) {
      resolveUserDecision(false);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    if (resolveUserDecision) {
      resolveUserDecision(true);
    }
  };

  const askUser = (
    question: string,
    informations: string
  ): Promise<boolean> => {
    setOpen(true);
    setDialogContent({ title: question, text: informations });
    return new Promise((resolve) => {
      setResolveUserDecision(() => resolve);
    });
  };

  return (
    <DialogContext.Provider value={{ askUser }}>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            ANNULER
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirm}
            autoFocus
          >
            VALIDER
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}

export { DialogContext };
