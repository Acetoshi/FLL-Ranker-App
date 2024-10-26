import { useState } from "react";
import { useGetUsersByRoleQuery } from "../types/graphql-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Jury } from "../types/graphql-types";

export default function ManageJuryRow({ jury }: { jury: Jury }) {
  const {
    loading: loadingJuror,
    // error: errorUserJuror,
    data: dataUserJuror,
  } = useGetUsersByRoleQuery({
    variables: {
      roleId: 2,
    },
  });

  const [jurorsIds, setJurorsIds] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof jurorsIds>) => {
    const {
      target: { value },
    } = event;
    setJurorsIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <TableRow
      key={jury.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{jury.id}</TableCell>
      <TableCell component="th" scope="row">
        <Stack spacing={1}>
          <strong>{jury.name}</strong>
          <Stack direction="row" spacing={1}>
            {jury.users &&
              jury.users.map((user) => (
                <Chip
                  key={user.id}
                  label={`${user.firstname} ${user.lastname}`}
                  variant="outlined"
                  onDelete={handleDelete}
                />
              ))}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              {loadingJuror ? "Loading..." : "Sélectionner les jurés"}
            </InputLabel>
            <Select
              labelId="select-multiple-jurors-label"
              id="select-multiple-jurors"
              multiple
              value={jurorsIds}
              onChange={handleChange}
              input={<OutlinedInput label="Juré" />}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps}
            >
              {dataUserJuror?.getUsersByRole &&
                dataUserJuror?.getUsersByRole.map((juror) => (
                  <MenuItem key={juror.id} value={juror.id}>
                    <Checkbox
                      checked={jurorsIds.includes(juror.id.toString())}
                    />
                    <ListItemText
                      primary={`${juror.firstname} ${juror.lastname}`}
                    />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </TableCell>
    </TableRow>
  );
}
