import { useState, useRef, RefObject } from "react";
import { TableRow, TableCell, TextField, Button, Stack } from "@mui/material";
import BtnTeam from "./BtnTeam";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import { Mode, TeamRowProps } from "../types/types";

export default function TeamRow({ mode, team }: TeamRowProps) {
  const [displayMode, setDisplayMode] = useState<Mode>(mode);

  // used to keep track of input errors
  const [inputError, setInputError] = useState({
    name: false,
    contact: false,
    location: false,
  });

  // used instead of states to avoid multiple re-renders when typing
  const newTeamNameRef = useRef<HTMLInputElement>(null);
  const newTeamContactRef = useRef<HTMLInputElement>(null);
  const newTeamLocationRef = useRef<HTMLInputElement>(null);

  const validateInput = (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current && inputRef.current.value;
    return value ? /.{5,100}/.test(value) : false;
  };

  const handleInputChange = (
    field: string,
    inputRef: RefObject<HTMLInputElement>
  ) => {
    const isValid = validateInput(inputRef);
    setInputError((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
  };

  return (
    <>
      <TableRow
        key={"team to add"}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {(displayMode === "create" || displayMode === "edit") && (
            <TextField
              inputRef={newTeamNameRef}
              label="nom"
              variant={displayMode === "edit" ? "standard" : "outlined"}
              defaultValue={displayMode === "edit" ? team.name : ""}
              fullWidth
              required
              onChange={() => handleInputChange("name", newTeamNameRef)}
              error={inputError.name}
              helperText={
                inputError.name
                  ? "Entrez un nom unique de plus de 5 caractères"
                  : ""
              }
            />
          )}
          {displayMode === "consult" && team.name}
        </TableCell>
        <TableCell>
          {(displayMode === "create" || displayMode === "edit") && (
            <TextField
              inputRef={newTeamContactRef}
              label="contact"
              variant={displayMode === "edit" ? "standard" : "outlined"}
              defaultValue={displayMode === "edit" ? team.contact : ""}
              fullWidth
              required
              onChange={() => handleInputChange("contact", newTeamContactRef)}
              error={inputError.contact}
              helperText={
                inputError.contact
                  ? "Entrez un contact de plus de 5 caractères"
                  : ""
              }
            />
          )}
          {displayMode === "consult" && team.contact}
        </TableCell>
        <TableCell>
          {(displayMode === "create" || displayMode === "edit") && (
            <TextField
              inputRef={newTeamLocationRef}
              label="provenance"
              variant={displayMode === "edit" ? "standard" : "outlined"}
              defaultValue={displayMode === "edit" ? team.location : ""}
              fullWidth
              required
              onChange={() => handleInputChange("location", newTeamLocationRef)}
              error={inputError.location}
              helperText={
                inputError.location
                  ? "Entrez une provenance de plus de 5 caractères"
                  : ""
              }
            />
          )}
          {displayMode === "consult" && team.location}
        </TableCell>
        <TableCell align="right">
          {displayMode === "create" && (
            <BtnTeam
              type="add"
              inputRefs={{
                name: newTeamNameRef,
                contact: newTeamContactRef,
                location: newTeamLocationRef,
              }}
              inputError={inputError}
              setInputError={setInputError}
              validateInput={validateInput}
              setDisplayMode={setDisplayMode}
            />
          )}
          {displayMode === "edit" && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <BtnTeam
                type="edit"
                teamId={team.id}
                inputRefs={{
                  name: newTeamNameRef,
                  contact: newTeamContactRef,
                  location: newTeamLocationRef,
                }}
                inputError={inputError}
                setInputError={setInputError}
                validateInput={validateInput}
                setDisplayMode={setDisplayMode}
              />

              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
                onClick={() => setDisplayMode("consult")}
              >
                ANNULER
              </Button>
            </Stack>
          )}
          {displayMode === "consult" && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setDisplayMode("edit")}
              >
                EDITER
              </Button>
              <BtnTeam
                type="delete"
                teamId={team.id}
                inputRefs={{
                  name: newTeamNameRef,
                  contact: newTeamContactRef,
                  location: newTeamLocationRef,
                }}
                inputError={inputError}
                setInputError={setInputError}
                validateInput={validateInput}
                setDisplayMode={setDisplayMode}
              />
            </Stack>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
