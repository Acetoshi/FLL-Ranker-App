import { useRef, useState } from "react";
import { TableRow, TableCell, TextField } from "@mui/material";
import { useCreateCompetitionMutation } from "../types/graphql-types";
import { GET_COMPETITIONS } from "../schemas/queries";
import BtnCRUD from "../components/BtnCRUD";

export default function CompetitionAddRow() {
  const [createCompetition] = useCreateCompetitionMutation();

  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);

  const locationRef = useRef<HTMLInputElement>(null);
  const [locationError, setLocationError] = useState<boolean>(false);

  const dateRef = useRef<HTMLInputElement>(null);
  const [dateError, setDateError] = useState<boolean>(false);

  const [btnIsDisabled, setBtnIsDisabled] = useState<boolean>(true);

  const handleDateValidation = () => {
    const value = dateRef.current && dateRef.current.value;
    return value && value >= new Date().toISOString().split("T")[0]
      ? true
      : false;
  };

  const validateText = (value: string | null) => {
    return value
      ? /.{5,100}/.test(value) && /^[A-Za-z0-9_-\s]+$/.test(value)
      : false;
  };

  const handleNameValidation = () => {
    const value = nameRef.current && nameRef.current.value;
    return validateText(value);
  };

  const handleLocationValidation = () => {
    const value = locationRef.current && locationRef.current.value;
    return validateText(value);
  };

  const handleInputChange = (element: string) => {
    switch (element) {
      case "nom":
        if (handleNameValidation()) {
          setNameError(false);
        } else {
          setNameError(true);
        }
        break;
      case "lieu":
        if (handleLocationValidation()) {
          setLocationError(false);
        } else {
          setLocationError(true);
        }
        break;
      case "date":
        if (handleDateValidation()) {
          setDateError(false);
        } else {
          setDateError(true);
        }
        break;
    }
    if (
      handleNameValidation() &&
      handleLocationValidation() &&
      handleDateValidation()
    ) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
  };

  const handleAdd = async () => {
    if (handleNameValidation()) {
      setNameError(false);
      setBtnIsDisabled(false);

      try {
        await createCompetition({
          refetchQueries: [{ query: GET_COMPETITIONS }],
          variables: {
            competition: {
              name: nameRef.current ? nameRef.current.value : "",
              location: locationRef.current ? locationRef.current.value : "",
              date: dateRef.current ? dateRef.current.value : "",
            },
          },
        });
      } catch {
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
        <TableCell align="left">
          <TextField
            inputRef={nameRef}
            required
            label="Nom"
            variant="outlined"
            fullWidth
            onChange={() => handleInputChange("nom")}
            error={nameError}
            helperText={
              nameError
                ? "Le nom doit faire entre 5 et 100 caractères alphanumériques"
                : ""
            }
          />
        </TableCell>
        <TableCell align="left">
          <TextField
            inputRef={locationRef}
            required
            label="Lieu"
            variant="outlined"
            fullWidth
            onChange={() => handleInputChange("lieu")}
            error={locationError}
            helperText={
              locationError
                ? "Le lieu doit faire entre 5 et 100 caractères alphanumériques"
                : ""
            }
          />
        </TableCell>
        <TableCell align="left">
          <TextField
            inputRef={dateRef}
            required
            fullWidth
            name="Date"
            label="Date"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            onChange={() => handleInputChange("date")}
            error={dateError}
            helperText={
              dateError
                ? "La date doit être supérieure à celle d'aujourd'hui"
                : ""
            }
          />
        </TableCell>
        <TableCell align="right">
          <BtnCRUD
            disabled={btnIsDisabled}
            handleClick={handleAdd}
            type="add"
          />
        </TableCell>
      </TableRow>
    </>
  );
}
