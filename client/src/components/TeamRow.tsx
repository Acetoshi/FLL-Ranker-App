import { useState, useRef, RefObject } from "react";
import { TableRow, TableCell, Stack } from "@mui/material";
import BtnCRUD from "./BtnCRUD";
import { BooleanMap, Mode, RefMap, TeamRowProps } from "../types/types";
import { useTeamsOperations } from "../services/teams";
import { useNotification } from "../hooks/useNotification";
import EditableTextCell from "./EditableTextCell";
export default function TeamRow({ mode, team, refetch }: TeamRowProps) {
  const [displayMode, setDisplayMode] = useState<Mode>(mode);

  // used to give feedback to the user
  const { notifySuccess, notifyError } = useNotification();
  const { handleAdd, handleEdit, handleDelete } = useTeamsOperations();

  // used to keep track of input errors
  const [inputError, setInputError] = useState<BooleanMap>({
    name: false,
    contact: false,
    location: false,
  });

  // used instead of states to avoid multiple re-renders when typing
  const teamRef: RefMap = {
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

  const highlightName = () => {
    setInputError((prevErrors) => ({ ...prevErrors, name: true }));
  };

  // This could be refactored with the correct iterator
  const clearInputFields = (teamRef: RefMap) => {
    if (teamRef.name.current) teamRef.name.current.value = "";
    if (teamRef.contact.current) teamRef.contact.current.value = "";
    if (teamRef.location.current) teamRef.location.current.value = "";
  };

  const submitEdition = async () => {
    if (team) {
      const { success, message } = await handleEdit(
        teamRef,
        team.id,
        validateInput
      );
      if (success) {
        notifySuccess("Modification enregistrée");
        setDisplayMode("consult");
        (await refetch)()
      } else {
        notifyError(message as string);
        highlightName();
      }
    }
  };

  const submitDeletion = async () => {
    if (team) {
      const { success, message } = await handleDelete(team.id);
      if (success) {
        notifySuccess("équipe supprimée");
        (await refetch)()
      } else {
        notifyError(message as string);
      }
    }
  };

  const submitCreation = async () => {
    const { success, message } = await handleAdd(teamRef, validateInput);
    if (success) {
      notifySuccess("équipe créée avec succès");
      clearInputFields(teamRef);
      (await refetch)()
    } else {
      notifyError(message);
      highlightName();
    }
  };

  const actionsMap = {
    edit: (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <BtnCRUD
          type="save"
          handleClick={submitEdition}
          disabled={Object.values(inputError).some((el) => el)}
        />
        <BtnCRUD type="cancel" handleClick={() => setDisplayMode("consult")} />
      </Stack>
    ),
    consult: (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <BtnCRUD
          type="edit"
          handleClick={() => setDisplayMode("edit")}
          disabled={Object.values(inputError).some((el) => el)}
        />
        <BtnCRUD type="delete" handleClick={submitDeletion} />
      </Stack>
    ),
    create: <BtnCRUD type="add" handleClick={submitCreation} />,
  };

  return (
    <>
      <TableRow
        key={team ? team.id : "newTeamRow"}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <EditableTextCell
          component="th"
          scope="row"
          displayMode={displayMode}
          inputRef={teamRef.name}
          label="nom"
          defaultValue={team && team.name}
          onChange={() => handleInputChange("name", teamRef.name)}
          error={inputError.name}
          helperText={
            inputError.name
              ? "Entrez un nom unique de plus de 5 caractères"
              : ""
          }
        />
        <EditableTextCell
          displayMode={displayMode}
          inputRef={teamRef.contact}
          label="contact"
          defaultValue={team && team.contact}
          onChange={() => handleInputChange("contact", teamRef.contact)}
          error={inputError.contact}
          helperText={
            inputError.contact
              ? "Entrez un contact de plus de 5 caractères"
              : ""
          }
        />
        <EditableTextCell
          displayMode={displayMode}
          inputRef={teamRef.location}
          label="provenance"
          defaultValue={team && team.location}
          onChange={() => handleInputChange("location", teamRef.location)}
          error={inputError.location}
          helperText={
            inputError.location
              ? "Entrez une provenance de plus de 5 caractères"
              : ""
          }
        />
        <TableCell align="right">{actionsMap[displayMode]}</TableCell>
      </TableRow>
    </>
  );
}
