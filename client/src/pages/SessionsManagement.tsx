import { useParams } from "react-router";
import {
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useGetCompetitionByIdQuery } from "../types/graphql-types";

export default function CompetitionsManagement() {
  const { competitionId } = useParams();

  const { loading, error, data } = useGetCompetitionByIdQuery({
    variables: { competitionId: parseInt(competitionId as string) },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  // aliasing the data for legibility
  const competition = data ? data.getCompetitionById : undefined;

  if (data)
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="25vh"
        >
          <Typography variant="h2" component="h1">
            {`Gestion planning ${competition && competition.name}`}
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Liste des jurys">
            <TableHead>
              <TableRow>
                <TableCell align="left">Créneau</TableCell>
                {competition &&
                  competition.juries.map((jury) => (
                    <TableCell key={`jury-${jury.id}`}>{jury.name}</TableCell>
                  ))}
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </>
    );
}
