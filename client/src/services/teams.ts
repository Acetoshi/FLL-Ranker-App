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
  const { notifySuccess, notifyError } = useNotification();

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

  const clearInputFields = (teamRef: RefMap) => {
    if (teamRef.name.current) teamRef.name.current.value = "";
    if (teamRef.contact.current) teamRef.contact.current.value = "";
    if (teamRef.location.current) teamRef.location.current.value = "";
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

    if (success) {
      notifySuccess("équipe supprimée");
    } else {
      notifyError(message as string);
    }
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
        clearInputFields(teamRef);
      } catch {
        notifyError("Erreur dans l'ajout de l'équipe");
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
        notifySuccess("Modification enregistrée");
        setDisplayMode("consult");
      } catch {
        notifyError("Erreur serveur dans l'édition l'équipe");
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
