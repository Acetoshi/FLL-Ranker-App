import { useState, useRef, RefObject } from "react";
import { TableRow, TableCell, TextField, Stack } from "@mui/material";
import BtnCUD from "./BtnCRUD";
import { BooleanMap, Mode, TeamRowProps } from "../types/types";
import { useTeamsOperations } from "../services/teams";

export default function TeamRow({ mode, team }: TeamRowProps) {
  const [displayMode, setDisplayMode] = useState<Mode>(mode);

  const { handleDelete, handleAdd, handleEdit } = useTeamsOperations();

  // used to keep track of input errors
  const [inputError, setInputError] = useState<BooleanMap>({
    name: false,
    contact: false,
    location: false,
  });

  // used instead of states to avoid multiple re-renders when typing
  const teamRef = {
    name: useRef<HTMLInputElement>(null),
    contact: useRef<HTMLInputElement>(null),
    location: useRef<HTMLInputElement>(null),
  };

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
              inputRef={teamRef.name}
              label="nom"
              variant={displayMode === "edit" ? "standard" : "outlined"}
              defaultValue={displayMode === "edit" ? team.name : ""}
              fullWidth
              required
              onChange={() => handleInputChange("name", teamRef.name)}
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
              inputRef={teamRef.contact}
              label="contact"
              variant={displayMode === "edit" ? "standard" : "outlined"}
              defaultValue={displayMode === "edit" ? team.contact : ""}
              fullWidth
              required
              onChange={() => handleInputChange("contact", teamRef.contact)}
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
              inputRef={teamRef.location}
              label="provenance"
              variant={displayMode === "edit" ? "standard" : "outlined"}
              defaultValue={displayMode === "edit" ? team.location : ""}
              fullWidth
              required
              onChange={() => handleInputChange("location", teamRef.location)}
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
            <BtnCUD
              type="add"
              handleClick={() =>
                handleAdd(teamRef, setInputError, validateInput)
              }
              disabled={
                inputError.name || inputError.contact || inputError.location
              }
            />
          )}
          {displayMode === "edit" && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <BtnCUD
                type="save"
                handleClick={() =>
                  handleEdit(
                    teamRef,
                    team.id,
                    setDisplayMode,
                    setInputError,
                    validateInput
                  )
                }
                disabled={
                  inputError.name || inputError.contact || inputError.location
                }
              />
              <BtnCUD type="cancel" handleClick={() => setDisplayMode("consult")} />
            </Stack>
          )}
          {displayMode === "consult" && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
               <BtnCUD type="edit" handleClick={() => setDisplayMode("edit")} />
              <BtnCUD type="delete" handleClick={() => handleDelete(team.id)} />
            </Stack>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
