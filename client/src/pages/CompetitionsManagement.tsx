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
} from "@mui/material";
import { useGetAllCompetitionsQuery } from "../types/graphql-types";
import CompetitionRow from "../components/CompetitionRow";

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
            <CompetitionRow mode="create" />
            {data &&
              data.getAllCompetitions
                .slice(0)
                .reverse()
                .map((competition) => (
                  <CompetitionRow mode="consult" competition={competition} />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
