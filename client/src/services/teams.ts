import { Dispatch, SetStateAction, RefObject } from "react";
import { GET_ALL_TEAMS } from "../schemas/queries";
import {
  TeamInput,
  TeamIdInput,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMutation,
  DeleteTeamMutation,
} from "../types/graphql-types";
import { useNotification } from "../hooks/useNotification";
import { RefMap, BooleanMap, Mode } from "../types/types";

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

  const createTeamInput = (teamRef: RefMap, id?: number) => {
    const team: TeamInput = {
      id: id || null,
      name: teamRef.name.current ? teamRef.name.current.value : "",
      contact: teamRef.contact.current ? teamRef.contact.current.value : "",
      location: teamRef.location.current ? teamRef.location.current.value : "",
    };
    return team;
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
    setInputError: Dispatch<SetStateAction<BooleanMap>>,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ) => {
    if (handleTeamInputValidation(teamRef, validateInput, setInputError)) {
      try {
        await addTeam({
          refetchQueries: [{ query: GET_ALL_TEAMS }],
          variables: { team: createTeamInput(teamRef) },
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
    }
  };

  const handleEdit = async (
    teamRef: RefMap,
    id: number,
    setDisplayMode: Dispatch<SetStateAction<Mode>>,
    setInputError: Dispatch<SetStateAction<BooleanMap>>,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ) => {
    if (handleTeamInputValidation(teamRef, validateInput, setInputError)) {
      try {
        await editTeam({
          refetchQueries: [{ query: GET_ALL_TEAMS }],
          variables: { team: createTeamInput(teamRef, id) },
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
