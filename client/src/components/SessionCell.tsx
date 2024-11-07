import { MenuItem, Select, TableCell } from "@mui/material";
import { Team } from "../types/graphql-types";

export default function SessionCell(teams:Team[]) {
  return (
    <TableCell>
      <Select
        id="add-team-select"
        label="Assigner une équipe"
        name="juror"
      >
        {teams.map(team=>(
          <MenuItem>{team.id}</MenuItem>
        ))}
      </Select>
    </TableCell>
  );
}
