import { RefObject } from "react";
import { GET_ALL_TEAMS } from "../schemas/queries";
import {
  TeamInput,
  TeamIdInput,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMutation,
  DeleteTeamMutation,
} from "../types/graphql-types";
import { RefMap } from "../types/types";

export const useTeamsOperations = () => {
  // mutations used for CRUD operations
  const [addTeam] = useCreateTeamMutation();
  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const handleTeamInputValidation = (
    teamRef: RefMap,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ) => {
    const isValidName = validateInput(teamRef.name);
    const isValidContact = validateInput(teamRef.contact);
    const isValidLocation = validateInput(teamRef.location);

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

    return { success, message };
  };

  const handleAdd = async (
    teamRef: RefMap,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ) => {
    if (handleTeamInputValidation(teamRef, validateInput)) {
      try {
        await addTeam({
          refetchQueries: [{ query: GET_ALL_TEAMS }],
          variables: { team: createTeamInput(teamRef) },
        });

        return { success: true, message: "" };
      } catch {
        return {
          success: false,
          message: "erreur serveur : le nom est-il unique ?",
        };
      }
    } else {
      return { success: false, message: "données invalides" };
    }
  };

  const handleEdit = async (
    teamRef: RefMap,
    id: number,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ) => {
    if (handleTeamInputValidation(teamRef, validateInput)) {
      try {
        await editTeam({
          refetchQueries: [{ query: GET_ALL_TEAMS }],
          variables: { team: createTeamInput(teamRef, id) },
        });
        return { success: true, message: "" };
      } catch {
        return {
          success: false,
          message: "erreur serveur : le nom est-il unique ?",
        };
      }
    } else {
      return { success: false, message: "données invalides" };
    }
  };

  return {
    handleDelete,
    handleAdd,
    handleEdit,
  };
};
