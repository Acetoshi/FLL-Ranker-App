import { useGetAllJuriesQuery, Jury } from "../types/graphql-types";
import ManageJuryAddRow from "../components/ManageJuryAddRow";
import ManageJuryRow from "../components/ManageJuryRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";

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
                <TableCell>Nom du jury</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.getAllJuries.map((jury) => (
                  <ManageJuryRow key={jury.id} jury={jury as Jury} />
                ))}
              <ManageJuryAddRow />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}
