import { useRef, useState } from "react";
import { ApolloQueryResult } from "@apollo/client";
import { createPortal } from "react-dom";
import {
  Exact,
  useCreateNewJuryMutation,
  GetAllJuriesQuery,
} from "../types/graphql-types";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

type refetchType = (
  variables?: Partial<Exact<{ [key: string]: never }>> | undefined,
) => Promise<ApolloQueryResult<GetAllJuriesQuery>>;

export default function ManageJuryAddRow({
  refetch,
}: {
  refetch: refetchType;
}) {
  const [createNewJury] = useCreateNewJuryMutation();

  // field error message
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState<boolean>(true);

  // alert message
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleNameValidation = () => {
    const value = nameRef.current && nameRef.current.value;
    return value
      ? /.{5,100}/.test(value) && /^[A-Za-z0-9À-ÖØ-öø-ÿ@_-\s]+$/.test(value)
      : false;
  };

  const handleInputChange = () => {
    if (handleNameValidation()) {
      setNameError(false);
      setBtnIsDisabled(false);
    } else {
      setMessage("Le nom doit faire entre 5 et 100 caractères alphanumériques");
      setNameError(true);
      setBtnIsDisabled(true);
    }
  };

  const handleNameAdd = async () => {
    if (handleNameValidation()) {
      setNameError(false);
      setOpenAlert(false);
      setBtnIsDisabled(false);

      try {
        await createNewJury({
          variables: {
            data: {
              name: nameRef.current ? nameRef.current.value : "",
            },
          },
        });
        (await refetch)();

        if (nameRef.current) nameRef.current.value = "";
      } catch {
        setMessage("Le nom doit être unique");
        setOpenAlert(true);
        setNameError(true);
      }
    } else {
      setNameError(true);
      setBtnIsDisabled(true);
    }
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left"></TableCell>
        <TableCell align="left">
          <TextField
            inputRef={nameRef}
            required
            label="Nom"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
            error={nameError}
            helperText={nameError ? message : ""}
          />
        </TableCell>
        <TableCell align="right">
          <Button
            disabled={btnIsDisabled}
            onClick={handleNameAdd}
            variant="contained"
          >
            AJOUTER
          </Button>
        </TableCell>
      </TableRow>

      {createPortal(
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>,
        document.body,
      )}
    </>
  );
}
