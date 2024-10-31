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
  // TextField,
  // Button,
} from "@mui/material";
import { useGetAllCompetitionsQuery } from "../types/graphql-types";
import CompetitionAddRow from "../components/CompetitionAddRow";

export default function CompetitionsManagement() {
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
              <TableCell>Lieu</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
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
                  <TableCell>{competition.location}</TableCell>
                  <TableCell>
                    {new Date(Date.parse(competition.date)).toLocaleDateString(
                      "fr-FR"
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            <CompetitionAddRow />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
