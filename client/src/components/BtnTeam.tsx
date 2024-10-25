import { RefObject, Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import {
  TeamInput,
  useCreateTeamMutation,
  useEditTeamMutation,
} from "../types/graphql-types";
import { GET_ALL_TEAMS } from "../schemas/queries";
import { Mode, SnackStatus, BooleanMap, RefMap } from "../types/types";


// This button is used in Team table to handle creating and editing 
export default function BtnTeam({
  type,
  inputError,
  setInputError,
  inputRefs,
  validateInput,
  setSnackStatus,
  setDisplayMode,
}: {
  type: "add" | "edit";
  inputError: BooleanMap;
  setInputError: Dispatch<SetStateAction<BooleanMap>>;
  inputRefs: RefMap;
  validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean;
  setDisplayMode: Dispatch<SetStateAction<Mode>>;
  setSnackStatus: Dispatch<SetStateAction<SnackStatus>>;
}) {
  const [addTeam] = useCreateTeamMutation();
  const [editTeam] = useEditTeamMutation();

  const handleTeamInputValidation = () => {
    const isValidName = validateInput(inputRefs.name);
    const isValidContact = validateInput(inputRefs.contact);
    const isValidLocation = validateInput(inputRefs.location);

    setInputError({
      name: !isValidName,
      contact: !isValidContact,
      location: !isValidLocation,
    });

    return isValidName && isValidContact && isValidLocation;
  };

  const handleClick = async () => {
    if (handleTeamInputValidation()) {
      try {
        const newTeam: TeamInput = {
          name: inputRefs.name.current ? inputRefs.name.current.value : "",
          contact: inputRefs.contact.current
            ? inputRefs.contact.current.value
            : "",
          location: inputRefs.location.current
            ? inputRefs.location.current.value
            : "",
        };
        if (type === "add") {
          await addTeam({
            refetchQueries: [{ query: GET_ALL_TEAMS }],
            variables: { team: newTeam },
          });
          if (inputRefs.name.current) inputRefs.name.current.value = "";
          if (inputRefs.contact.current) inputRefs.contact.current.value = "";
          if (inputRefs.location.current) inputRefs.location.current.value = "";
        }
        if (type === "edit") {
          await editTeam({
            refetchQueries: [{ query: GET_ALL_TEAMS }],
            variables: { team: newTeam },
          });
          setSnackStatus({
            open: true,
            message: "Modification enregistrée",
            severity: "success",
          });
          setDisplayMode("consult");
        }
      } catch {
        if (type === "add") {
          setSnackStatus({
            open: true,
            message: "Erreur dans l'ajout de l'équipe, le nom est-il unique ? ",
            severity: "error",
          });
        }

        if (type === "edit") {
          setSnackStatus({
            open: true,
            message: "Erreur serveur dans l'édition l'équipe",
            severity: "error",
          });
        }

        setInputError((prevErrors) => ({ ...prevErrors, name: true }));
      }
    }
  };

  return (
    <Button
      color={type === "add" ? "primary" : "success"}
      disabled={inputError.name || inputError.contact || inputError.location}
      variant="contained"
      onClick={handleClick}
    >
      {type === "add" && "AJOUTER"}
      {type === "edit" && "SAUVEGARDER"}
    </Button>
  );
}
