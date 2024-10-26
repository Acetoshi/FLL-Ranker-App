import { useGetAllJuriesQuery } from "../types/graphql-types";
import JuryAddRow from "../components/JuryAddRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import ManageJuryRow from "../components/ManageJuryRow";
import { Jury } from "../types/graphql-types";

export default function JuriesManagement() {
  const { loading, error, data } = useGetAllJuriesQuery();

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="25vh"
      >
        <Typography variant="h2" component="h1">
          Gestion des jurys
        </Typography>
      </Box>

      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Liste des jurys">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.getAllJuries.map((jury) => (
                  <ManageJuryRow key={jury.id} jury={jury as Jury} />
                  // <TableRow
                  //   key={jury.id}
                  //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // >
                  //   <TableCell align="left">{jury.id}</TableCell>
                  //   <TableCell component="th" scope="row">
                  //     <Stack spacing={1}>
                  //       <strong>{jury.name}</strong>
                  //       <Stack direction="row" spacing={1}>
                  //         {jury.users &&
                  //           jury.users.map((user) => (
                  //             <Chip
                  //               key={user.id}
                  //               label={`${user.firstname} ${user.lastname}`}
                  //               variant="outlined"
                  //               onDelete={handleDelete}
                  //             />
                  //           ))}
                  //       </Stack>
                  //     </Stack>
                  //   </TableCell>
                  //   <TableCell align="right">
                  //     <Button
                  //       onClick={handleOpen}
                  //       aria-label="Ajouter un juré"
                  //       variant="outlined"
                  //     >
                  //       <Add />
                  //       Ajouter un juré
                  //     </Button>
                  //     <div>
                  //       <FormControl sx={{ m: 1, width: 300 }}>
                  //         <InputLabel id="demo-multiple-checkbox-label">
                  //           Sélectionner les jurés
                  //         </InputLabel>
                  //         <Select
                  //           labelId="demo-multiple-checkbox-label"
                  //           id="demo-multiple-checkbox"
                  //           multiple
                  //           value={personName}
                  //           onChange={handleChange}
                  //           input={<OutlinedInput label="Juré" />}
                  //           renderValue={(selected) => selected.join(", ")}
                  //           // MenuProps={MenuProps}
                  //         >
                  //           {dataUserJuror?.getUsersByRole &&
                  //             dataUserJuror?.getUsersByRole.map((juror) => (
                  //               <MenuItem
                  //                 key={juror.id}
                  //                 value={`${juror.firstname} ${juror.lastname}`}
                  //               >
                  //                 <Checkbox
                  //                   checked={personName.includes(
                  //                     `${juror.firstname} ${juror.lastname}`,
                  //                   )}
                  //                 />
                  //                 <ListItemText
                  //                   primary={`${juror.firstname} ${juror.lastname}`}
                  //                 />
                  //               </MenuItem>
                  //             ))}
                  //         </Select>
                  //       </FormControl>
                  //     </div>
                  //   </TableCell>
                  // </TableRow>
                ))}
              <JuryAddRow />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}
