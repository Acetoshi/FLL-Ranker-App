import { useState, useEffect } from "react";
import {
  useGetUsersByRoleQuery,
  useAddUserToJuryMutation,
  useRemoveUserFromJuryMutation,
  useDeleteJuryMutation,
  Jury,
  User,
  DeleteJuryMutation,
} from "../types/graphql-types";
import { JuriesOfCompetitionRefetchType } from "../types/types";
import { useDialog } from "../hooks/useDialog";
import { useNotification } from "../hooks/useNotification";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

export default function ManageJuryRow({
  jury,
  refetch,
}: {
  jury: Jury;
  refetch: JuriesOfCompetitionRefetchType;
}) {
  const { notifySuccess, notifyError } = useNotification();
  const { askUser } = useDialog();

  const [jurors, setJurors] = useState<User[]>(jury.users);
  const [juror] = useState<string>("");
  const [usersSelect, setUsersSelect] = useState<User[]>([]);
  const { loading, error, data } = useGetUsersByRoleQuery({
    variables: {
      roleId: 2, // we want only juror role here
    },
  });
  const [deleteJury] = useDeleteJuryMutation();
  const [addUserToJury] = useAddUserToJuryMutation();
  const [removeUserFromJury] = useRemoveUserFromJuryMutation();

  useEffect(() => {
    if (data) {
      setUsersSelect(data.getUsersByRole as User[]);
    }
  }, [data, jurors]);

  const handleSelectChange = async (event: SelectChangeEvent) => {
    setUsersSelect((prev) =>
      prev.filter((user) => user.id !== parseInt(event.target.value)),
    );

    const theJuror = await addUserToJury({
      variables: {
        data: {
          userId: parseInt(event.target.value),
          juryId: jury.id,
        },
      },
    });

    setJurors((prev) => [...prev, theJuror.data?.addUserToJury as User]);
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
      prev.filter(
        (user: User) => user.id !== theJuror.data?.removeUserFromJury.id,
      ),
    );

    setUsersSelect((prev) => [
      ...prev,
      theJuror.data?.removeUserFromJury as User,
    ]);
  };

  const handleDeleteJury = async (jury: Jury) => {
    const userConfirms = await askUser(
      `Supprimer le jury ${jury && jury.name} ?`,
      "Cette action est définitive !",
    );

    if (jury && userConfirms) {
      const {
        data: {
          deleteJury: { success, message },
        },
      } = (await deleteJury({
        variables: {
          data: {
            juryId: jury.id,
          },
        },
      })) as { data: DeleteJuryMutation };

      if (success) {
        notifySuccess("Jury supprimé");
        (await refetch)();
      } else {
        notifyError(message as string);
      }
    }
  };

  if (loading)
    return (
      <TableRow>
        <TableCell>Loading...</TableCell>
      </TableRow>
    );
  if (error)
    return (
      <TableRow>
        <TableCell>Error: {error.message}</TableCell>
      </TableRow>
    );

  return (
    <TableRow
      key={jury.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{jury.id}</TableCell>
      <TableCell component="th" scope="row">
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <strong>{jury.name}</strong>{" "}
            <DeleteIcon
              onClick={() => handleDeleteJury(jury)}
              fontSize="small"
              sx={{
                color: red[100],
                "&:hover": {
                  color: "red",
                },
              }}
            />
          </Stack>
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
            {!loading && usersSelect && (
              <FormControl
                fullWidth
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                variant="standard"
              >
                <InputLabel id="add-juror-input">Ajouter un juré</InputLabel>
                {error && <p>Erreur chargement des jurés.</p>}
                <Select
                  labelId="add-juror-select-label"
                  id="add-juror-select"
                  value={juror}
                  label="Ajouter un juré"
                  name="juror"
                  onChange={handleSelectChange}
                >
                  {usersSelect.map((ju: User) => {
                    if (!jurors.find((user) => user.id === ju.id)) {
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
