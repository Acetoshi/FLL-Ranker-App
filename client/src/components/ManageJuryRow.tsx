import { useState } from "react";
import {
  useGetUsersByRoleQuery,
  // useGetJuryByIdQuery,
  useAddUserToJuryMutation,
  Jury,
  User,
} from "../types/graphql-types";
//import { GET_JURY_BY_ID } from "../schemas/queries";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Button } from "@mui/material";

export default function ManageJuryRow({ jury }: { jury: Jury }) {
  const {
    loading: loadingJuror,
    error: errorJuror,
    data: dataUserJuror,
  } = useGetUsersByRoleQuery({
    variables: {
      roleId: 2, // we only want juror role here
    },
  });
  const [usedAddUserToJury] = useAddUserToJuryMutation();

  const [juror, setJuror] = useState<string>("");
  const [btnIsDisabled, setBtnIsDisabled] = useState<boolean>(true);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setJuror(event.target.value as string);
    setBtnIsDisabled(false);
  };

  const handleSubmitJuror = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    usedAddUserToJury({
      variables: {
        data: {
          userId: parseInt(juror),
          juryId: jury.id,
        },
      },
      //refetchQueries: [{ query: GET_JURY_BY_ID }],
    });
  };

  const handleDelete = () => {
    console.info("Delete.");
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
              jury.users.map((user: User) => (
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
        <Box
          component="form"
          onSubmit={handleSubmitJuror}
          sx={{ maxWidth: 400, mx: "auto", p: 2 }}
        >
          <Stack direction="row" spacing={1}>
            <FormControl
              fullWidth
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              variant="standard"
            >
              <InputLabel id="add-juror-input">Ajouter un juré</InputLabel>
              {errorJuror && <p>Erreur chargement des jurés.</p>}
              <Select
                labelId="add-juror-select-label"
                id="add-juror-select"
                value={juror}
                label="Ajouter un juré"
                name="juror"
                onChange={handleSelectChange}
              >
                {!loadingJuror &&
                  dataUserJuror?.getUsersByRole &&
                  dataUserJuror.getUsersByRole.map((ju) => (
                    <MenuItem key={ju.id} value={ju.id}>
                      {ju.firstname} {ju.lastname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button disabled={btnIsDisabled} type="submit">
              Ajouter
            </Button>
          </Stack>
        </Box>
      </TableCell>
    </TableRow>
  );
}
