import { RefObject } from "react";
import {
  TeamInput,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMutation,
  DeleteTeamMutation,
  IdInput,
} from "../../types/graphql-types";
import { DataHandlerResult, RefMap } from "../../types/types";

export const useTeamsOperations = () => {
  // mutations used for CRUD operations
  const [addTeam] = useCreateTeamMutation();
  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const handleTeamInputValidation = (
    inputRefs: RefMap,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ) => {
    const isValidName = validateInput(inputRefs.name);
    const isValidContact = validateInput(inputRefs.contact);
    const isValidLocation = validateInput(inputRefs.location);

    return isValidName && isValidContact && isValidLocation;
  };

  const createTeamInput = (
    inputRefs: RefMap,
    competitionId: number,
    id?: number
  ) => {
    const team: TeamInput = {
      id: id || null,
      name: inputRefs.name.current ? inputRefs.name.current.value : "",
      contact: inputRefs.contact.current ? inputRefs.contact.current.value : "",
      location: inputRefs.location.current
        ? inputRefs.location.current.value
        : "",
      competitionId: competitionId,
    };
    return team;
  };

  const handleDelete = async (targetId: number): Promise<DataHandlerResult> => {
    const targetTeam: Partial<TeamInput> = {
      id: targetId,
    };
    const {
      data: {
        deleteTeam: { success, message },
      },
    } = (await deleteTeam({
      variables: { team: targetTeam as IdInput },
    })) as { data: DeleteTeamMutation };

    return { success, message };
  };

  const handleAdd = async (
    teamRef: RefMap,
    competitionId: number,
    validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean
  ): Promise<DataHandlerResult> => {
    if (handleTeamInputValidation(teamRef, validateInput)) {
      try {
        await addTeam({
          variables: { team: createTeamInput(teamRef, competitionId) },
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
  ): Promise<DataHandlerResult> => {
    if (handleTeamInputValidation(teamRef, validateInput)) {
      try {
        await editTeam({
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
