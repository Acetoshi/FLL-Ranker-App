import { Button } from "@mui/material";
import { GET_ALL_TEAMS } from "../schemas/queries";
import {
  TeamInput,
  useCreateTeamMutation,
  useEditTeamMutation,
} from "../types/graphql-types";
import { BtnTeamProps } from "../types/types";

// This button is used in Team table to handle creating and editing
export default function BtnTeam({
  type,
  teamId,
  inputError,
  setInputError,
  inputRefs,
  validateInput,
  setSnackStatus,
  setDisplayMode,
}: BtnTeamProps) {
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
            variables: { team: { ...newTeam, id: teamId } },
          });
          setSnackStatus({
            open: true,
            message: "Modification enregistrée",
            severity: "success",
          });
          setDisplayMode("consult");
        }
      } catch {
        setSnackStatus({
          open: true,
          message: `${
            type === "add" &&
            "Erreur dans l'ajout de l'équipe, le nom est-il unique ?"
          }
            ${type === "edit" && "Erreur serveur dans l'édition l'équipe"}`,
          severity: "error",
        });
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
