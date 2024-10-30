import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useGetAllCompetitionsQuery } from "../types/graphql-types";

export default function TeamsManagement() {
  const { loading, error, data } = useGetAllCompetitionsQuery();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="25vh"
      >
        <Typography variant="h2" component="h1">
          Gestion des compétitions
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Lieu</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getAllCompetitions.map((competition) => (
                <TableRow
                  key={competition.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {competition.name}
                  </TableCell>
                  <TableCell align="right">{competition.location}</TableCell>
                  <TableCell align="right">
                    <TextField
                      name="someDate"
                      label="Some Date"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      defaultValue={competition.date}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button>Ajouter</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
