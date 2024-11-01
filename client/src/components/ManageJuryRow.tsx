import { useState } from "react";
import {
  useGetUsersByRoleQuery,
  useAddUserToJuryMutation,
  useRemoveUserFromJuryMutation,
  Jury,
  User,
} from "../types/graphql-types";
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
  const [jurors, setJurors] = useState<User[]>(jury.users);
  const {
    loading: loadingJuror,
    error: errorJuror,
    data: dataUserJuror,
  } = useGetUsersByRoleQuery({
    variables: {
      roleId: 2, // we want only juror role here
    },
  });
  const [addUserToJury] = useAddUserToJuryMutation();
  const [removeUserFromJury] = useRemoveUserFromJuryMutation();

  // const [usersSelect, setUsersSelect] = useState([]);
  // const [usersSelect, setUsersSelect] = useState<
  //   typeof useGetUsersByRoleQuery | undefined
  // >();

  // useEffect(() => {
  //   setUsersSelect(dataUserJuror.getUsersByRole as User[]);
  //   console.log(dataUserJuror.getUsersByRole);
  // }, []);

  const [juror, setJuror] = useState<string>("");

  const handleSelectChange = async (event: SelectChangeEvent) => {
    setJuror(event.target.value as string);
    // setUsersSelect((prev) =>
    //   prev.filter((user) => user.id !== event.target.value),
    // );

    const theJuror = await addUserToJury({
      variables: {
        data: {
          userId: parseInt(event.target.value),
          juryId: jury.id,
        },
      },
    });

    setJurors((prev) => [...prev, theJuror.data?.addUserToJury as User]);
    setJuror("");
  };

  const handleDelete = async (userId: number) => {
    const theJuror = await removeUserFromJury({
      variables: {
        data: {
          userId: userId,
          juryId: jury.id,
        },
      },
    });
    setJurors((prev) =>
      prev.filter((user) => user.id !== theJuror.data?.removeUserFromJury.id),
    );
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
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {jurors &&
              jurors.map((user: User) => (
                <Chip
                  key={user.id}
                  label={`${user.firstname} ${user.lastname}`}
                  variant="outlined"
                  onDelete={() => handleDelete(user.id)}
                  color="info"
                />
              ))}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Box component="form" sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <Stack direction="row" spacing={1}>
            {!loadingJuror && dataUserJuror?.getUsersByRole && (
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
                  {dataUserJuror.getUsersByRole.map((ju) => {
                    if (!jury.users.find((user) => user.id === ju.id)) {
                      return (
                        <MenuItem key={ju.id} value={ju.id}>
                          {ju.firstname} {ju.lastname}
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>
            )}
          </Stack>
        </Box>
      </TableCell>
    </TableRow>
  );
}
