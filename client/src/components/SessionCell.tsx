import { MenuItem, Select, SelectChangeEvent, TableCell } from "@mui/material";
import { useState } from "react";

type MinimalTeam = {
  id: number;
  name: string;
};

export default function SessionCell({ teams }: { teams: MinimalTeam[] }) {

  const noTeam = {
    id: 0,
    name: "disponible",
  }

  const [selectedTeam, setSelectedTeam] = useState<MinimalTeam>(noTeam);

  const handleSelect = (event: SelectChangeEvent) => {
    const targetTeam = teams.find((team) => team.name === event.target.value);
    if (targetTeam) {
      setSelectedTeam(targetTeam)
    } else {
      setSelectedTeam(noTeam)
    };
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
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.name}>
            {team.name}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  );
}
