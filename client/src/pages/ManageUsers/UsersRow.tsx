import { useState, useRef, RefObject } from "react";
import { TableRow, TableCell, Stack } from "@mui/material";
import BtnCRUD from "../../components/BtnCRUD";
import { BooleanMap, Mode, RefMap } from "../../types/types";
// import { useNotification } from "../../hooks/useNotification";
import EditableTextCell from "../../components/EditableTextCell";
// import { useDialog } from "../../hooks/useDialog";
export default function UserRow({ mode = "consult", user }) {
  const [displayMode, setDisplayMode] = useState<Mode>(mode);

  // used to give feedback to the user
  // const { notifySuccess, notifyError } = useNotification();
  // const { askUser } = useDialog();
  // const { handleAdd, handleEdit, handleDelete } = useTeamsOperations();

  // used to keep track of input errors
  const [inputError, setInputError] = useState<BooleanMap>({
    firstname: false,
    lastname: false,
    email: false,
    role: false,
  });

  // used instead of states to avoid multiple re-renders when typing
  const userRef: RefMap = {
    firstname: useRef<HTMLInputElement>(null),
    lastname: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    role: useRef<HTMLInputElement>(null),
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

  // This could be refactored with the correct iterator
  // const clearInputFields = (userRef: RefMap) => {
  //   if (userRef.firstname.current) userRef.firstname.current.value = "";
  //   if (userRef.email.current) userRef.email.current.value = "";
  //   if (userRef.role.current) userRef.role.current.value = "";
  // };

  const submitEdition = async () => {
    // if (user) {
    //   const { success, message } = await handleEdit(
    //     userRef,
    //     user.id,
    //     validateInput
    //   );
    //   if (success) {
    //     notifySuccess("Modification enregistrée");
    //     setDisplayMode("consult");
    //     (await refetch)();
    //   } else {
    //     notifyError(message as string);
    //     highlightName();
    //   }
    // }
  };

  const submitDeletion = async () => {
    // const userConfirms = await askUser(
    //   `Supprimer l'équipe ${user && user.firstname} ?`,
    //   "Cette action est définitive, elle supprime également l'ensemble des scores de cette équipe s'ils existent"
    // );
    // if (user && userConfirms) {
    //   const { success, message } = await handleDelete(user.id);
    //   if (success) {
    //     notifySuccess("équipe supprimée");
    //     (await refetch)();
    //   } else {
    //     notifyError(message as string);
    //   }
    // }
  };

  const submitCreation = async () => {
    // const { success, message } = await handleAdd(userRef, validateInput);
    // if (success) {
    //   notifySuccess("équipe créée avec succès");
    //   clearInputFields(userRef);
    //   (await refetch)();
    // } else {
    //   notifyError(message);
    //   highlightName();
    // }
  };

  const handleDisabled = (): boolean => {
    return (
      Object.values(inputError).some((el) => el) ||
      Object.values(userRef).some(
        (el) => el.current != null && el.current.value == ""
      )
    );
  };

  const actionsMap = {
    edit: (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <BtnCRUD
          type="save"
          handleClick={submitEdition}
          disabled={handleDisabled()}
        />
        <BtnCRUD type="cancel" handleClick={() => setDisplayMode("consult")} />
      </Stack>
    ),
    consult: (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <BtnCRUD type="edit" handleClick={() => setDisplayMode("edit")} />
        <BtnCRUD type="delete" handleClick={submitDeletion} />
      </Stack>
    ),
    create: (
      <BtnCRUD
        type="add"
        handleClick={submitCreation}
        disabled={handleDisabled()}
      />
    ),
  };

  return (
    <>
      <TableRow
        key={user ? user.id : "newTeamRow"}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <EditableTextCell
          component="th"
          scope="row"
          displayMode={displayMode}
          inputRef={userRef.firstname}
          label="prénom"
          defaultValue={user && user.firstname}
          onChange={() => handleInputChange("firstname", userRef.firstname)}
          error={inputError.firstname}
          helperText={"Entrez un nom unique de plus de 5 caractères"}
        />
        <EditableTextCell
          component="th"
          scope="row"
          displayMode={displayMode}
          inputRef={userRef.lastname}
          label="nom"
          defaultValue={user && user.lastname}
          onChange={() => handleInputChange("lastname", userRef.lastname)}
          error={inputError.lastname}
          helperText={"Entrez un nom unique de plus de 5 caractères"}
        />
        <EditableTextCell
          displayMode={displayMode}
          inputRef={userRef.email}
          label="email"
          defaultValue={user && user.email}
          onChange={() => handleInputChange("email", userRef.email)}
          error={inputError.email}
          helperText={"Entrez un email de plus de 5 caractères"}
        />
        <EditableTextCell //TODO : this needs to because a selector
          displayMode={displayMode}
          inputRef={userRef.role}
          label="rôle"
          defaultValue={user && user.role.label}
          onChange={() => handleInputChange("role", userRef.role)}
          error={inputError.role}
          helperText={"Entrez une provenance de plus de 5 caractères"}
        />
        <TableCell align="right">{actionsMap[displayMode]}</TableCell>
      </TableRow>
    </>
  );
}
