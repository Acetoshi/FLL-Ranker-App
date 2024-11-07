import { MenuItem, Select, SelectChangeEvent, TableCell } from "@mui/material";
import { useState } from "react";
import { useSessionsOperations } from "../services/sessions";
import { useNotification } from "../hooks/useNotification";
import { MinimalTeam, SessionCellProps } from "../types/types";

export default function SessionCell({
  refetch,
  session,
  teams,
  juryId,
  competitionId,
  startTime,
  endTime,
}: SessionCellProps) {
  const { handleAddSession, handleEditSession, handleDeleteSession } =
    useSessionsOperations();

  // used to give feedback to the user
  const { notifySuccess, notifyError } = useNotification();

  const noTeam = {
    id: 0,
    name: "disponible",
  };
  const defaultTeam = session ? session.team : noTeam;
  const [selectedTeam, setSelectedTeam] = useState<MinimalTeam>(defaultTeam);

  const submitCreation = async (targetTeam: MinimalTeam) => {
    const { success, message } = await handleAddSession(
      startTime,
      endTime,
      competitionId,
      juryId,
      targetTeam.id
    );
    if (success) {
      notifySuccess("Créneau enregistré");
      setSelectedTeam(targetTeam);
    } else {
      notifyError(message as string);
    }
  };

  const submitEdition = async (targetTeam: MinimalTeam) => {
    if (session) {
      const { success, message } = await handleEditSession(
        session.id,
        targetTeam.id,
      );
      if (success) {
        notifySuccess("Modification enregistrée");
        setSelectedTeam(targetTeam);
      } else {
        notifyError(message as string);
      }
    }
  };

  const submitDeletion = async () => {
    if (session) {
      const { success, message } = await handleDeleteSession(session.id);
      if (success) {
        notifySuccess("Créneau supprimé");
        setSelectedTeam(noTeam);
      } else {
        notifyError(message as string);
      }
    }
  };

  const handleSelect = async (event: SelectChangeEvent) => {
    const targetTeam = teams?.find((team) => team.name === event.target.value);
    if (targetTeam) {
      if (session) {
        await submitEdition(targetTeam);
      } else {
        await submitCreation(targetTeam);
      }
      await refetch();
    } else {
      await submitDeletion();

      await refetch();
    }
  };

  const fixedSizeCell = {
    minWidth: 200,
    maxWidth: 200,
  };

  return (
    <TableCell sx={fixedSizeCell}>
      <Select
        fullWidth
        id="add-team-select"
        value={selectedTeam.name}
        onChange={handleSelect}
      >
        <MenuItem value="disponible">-</MenuItem>
        {teams?.map((team) => (
          <MenuItem key={team.id} value={team.name}>
            {team.name}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  );
}
