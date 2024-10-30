import { Dispatch, SetStateAction, RefObject } from "react";
import { GET_ALL_TEAMS } from "../schemas/queries";
import {
  TeamIdInput,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMutation,
  DeleteTeamMutation,
} from "../types/graphql-types";
import { useNotification } from "../hooks/useNotification";
import { RefMap, BooleanMap } from "../types/types";

export const useTeamsOperations = () => {
  // mutations used for CRUD operations
  const [addTeam] = useCreateTeamMutation();
  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  // used to give feedback to the user
  const { setNotification } = useNotification();

  const handleTeamInputValidation = (
    teamRef: RefMap,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean,
    setInputError: Dispatch<SetStateAction<BooleanMap>>
  ) => {
    const isValidName = validateInput(teamRef.name);
    const isValidContact = validateInput(teamRef.contact);
    const isValidLocation = validateInput(teamRef.location);

    setInputError({
      name: !isValidName,
      contact: !isValidContact,
      location: !isValidLocation,
    });

    return isValidName && isValidContact && isValidLocation;
  };

  const handleDelete = async (targetId: number) => {
    const targetTeam: TeamIdInput = {
      id: targetId,
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
  };

  const handleAdd = async (
    teamRef: RefMap,
    setInputError: Dispatch<SetStateAction<BooleanMap>>
  ) => {
    try {
      await addTeam({
        refetchQueries: [{ query: GET_ALL_TEAMS }],
        variables: { team: newTeam },
      });
      if (teamRef.name.current) teamRef.name.current.value = "";
      if (teamRef.contact.current) teamRef.contact.current.value = "";
      if (teamRef.location.current) teamRef.location.current.value = "";
    } catch {
      setNotification({
        open: true,
        message: "Erreur dans l'ajout de l'équipe, le nom est-il unique ?",
        severity: "error",
      });
      setInputError((prevErrors) => ({ ...prevErrors, name: true }));
    }
  };

  const handleEdit = async (
    teamRef: RefMap,
    setDisplayMode,
    setInputError,
    validateInput
  ) => {
    if (
      handleTeamInputValidation(
        teamRef.name.current.value,
        teamRef.contact.current.value,
        teamRef.location.current.value,
        validateInput,
        setInputError
      )
    ) {
      try {
        await editTeam({
          refetchQueries: [{ query: GET_ALL_TEAMS }],
          variables: { team: { ...newTeam } },
        });
        setNotification({
          open: true,
          message: "Modification enregistrée",
          severity: "success",
        });
        setDisplayMode("consult");
      } catch {
        setNotification({
          open: true,
          message: "Erreur serveur dans l'édition l'équipe",
          severity: "error",
        });
        setInputError((prevErrors) => ({ ...prevErrors, name: true }));
      }
    }
  };

  return {
    handleDelete,
    handleAdd,
    handleEdit,
  };
};
