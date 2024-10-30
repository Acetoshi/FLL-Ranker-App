import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { GET_ALL_TEAMS } from "../schemas/queries";
import {
  TeamIdInput,
  TeamInput,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMutation,
  DeleteTeamMutation,
} from "../types/graphql-types";
import { BtnTeamProps } from "../types/types";
import { useNotification } from "../hooks/useNotification";

// This button is used in Team table to handle creating and editing
export default function BtnTeam({
  type,
  teamId,
  inputError,
  setInputError,
  inputRefs,
  validateInput,
  setDisplayMode,
}: BtnTeamProps) {
  const [addTeam] = useCreateTeamMutation();
  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const { setNotification } = useNotification();

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

  const buttonColorMap: { [key: string]: "success" | "error" | "primary" } = {
    edit: "success",
    delete: "error",
    add: "primary",
  };

  const buttonTextMap: { [key: string]: string } = {
    edit: "SAUVEGARDER",
    delete: "SUPPRIMER",
    add: "AJOUTER",
  };

  const handleClick = async () => {
    if (type === "delete") {
      const targetTeam: TeamIdInput = {
        id: teamId,
      };
      const {
        data: {
          deleteTeam: { success, message },
        },
      } = (await deleteTeam({
        refetchQueries: [{ query: GET_ALL_TEAMS }],
        variables: { team: targetTeam },
      })) as { data: DeleteTeamMutation };

      setNotification({
        open: true,
        message: success ? "équipe supprimée" : (message as string),
        severity: success ? "success" : "error",
      });
    } else {
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
            if (inputRefs.location.current)
              inputRefs.location.current.value = "";
          }

          if (type === "edit") {
            await editTeam({
              refetchQueries: [{ query: GET_ALL_TEAMS }],
              variables: { team: { ...newTeam, id: teamId } },
            });
            setNotification({
              open: true,
              message: "Modification enregistrée",
              severity: "success",
            });
            setDisplayMode("consult");
          }
        } catch {
          setNotification({
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
    }
  };

  return (
    <Button
      color={buttonColorMap[type]}
      disabled={
        type !== "delete" &&
        (inputError.name || inputError.contact || inputError.location)
      }
      variant={type === "delete" ? "outlined" : "contained"}
      onClick={handleClick}
      startIcon={
        (type === "delete" && <DeleteIcon />) ||
        (type === "add" && <AddIcon />) ||
        (type === "edit" && <SaveIcon />)
      }
    >
      {buttonTextMap[type]}
    </Button>
  );
}
