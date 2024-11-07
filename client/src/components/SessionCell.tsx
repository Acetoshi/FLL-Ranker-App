import { FormControl, MenuItem, Select, SelectChangeEvent, TableCell } from "@mui/material";
import { useState } from "react";

type Team={
  id:number;
  name:string;
}

export default function SessionCell({teams}:{teams:Team[]}) {
  const [selectedTeam, setSelectedTeam]= useState<Team>({id:0,name:"créneau disponible"});

  const handleSelect = (event : SelectChangeEvent) => {
    const targetTeam = teams.find(team=>team.id===event.target.value)
    setSelectedTeam(targetTeam)}


    const fixedSizeCell = {
      minWidth: 200,
      maxWidth: 200,
    };
  
  return (
 
    <TableCell sx={fixedSizeCell}>
         <FormControl
                fullWidth
                sx={{ m: 1}}
                size="small"
              >
      <Select
        id="add-team-select"
        name="juror"
        value={selectedTeam.id}
        onChange={handleSelect}
      >
        {teams.map(team=>(
          <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
        ))}
      </Select>
      </FormControl>
    </TableCell>
  );
}
