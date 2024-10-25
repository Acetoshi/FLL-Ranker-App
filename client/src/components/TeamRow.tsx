import { useState, useRef, RefObject, Dispatch, SetStateAction } from "react";
import { TableRow, TableCell, TextField, Button, Stack } from "@mui/material";
import BtnTeam from "./BtnTeam";
import { Team } from "../types/graphql-types";
import { Mode, SnackStatus } from "../types/types";

export default function TeamRow({
  mode,
  team,
  setSnackStatus,
}: {
  team: Team;
  mode: Mode;
  setDisplayMode: Dispatch<SetStateAction<Mode>>;
  setSnackStatus: Dispatch<SetStateAction<SnackStatus>>;
}) {
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
              setSnackStatus={setSnackStatus}
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
                setSnackStatus={setSnackStatus}
                setDisplayMode={setDisplayMode}
              />

              <Button
                variant="outlined"
                color="error"
                onClick={() => setDisplayMode("consult")}
              >
                ANNULER
              </Button>
            </Stack>
          )}
          {displayMode === "consult" && (
            <Button variant="outlined" onClick={() => setDisplayMode("edit")}>
              EDITER
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
