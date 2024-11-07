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
// import SessionCell from "../components/SessionCell";

export default function CompetitionsManagement() {
  const { competitionId } = useParams();

  const { loading, error, data } = useGetCompetitionByIdQuery({
    variables: { competitionId: parseInt(competitionId as string) },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  // aliasing the data for legibility
  const competition = data ? data.getCompetitionById : undefined;
  // const teams= data ? data.getCompetitionById : undefined;

  const timeSlots = [
    "09h00-09h45",
    "09h45-10h30",
    "10h30-11h15",
    "11h15-12h00",
    "12h00-12h45",
    "12h45-13h30",
    "13h30-14h15",
    "14h15-15h00",
    "15h00-15h45",
    "15h45-16h30",
    "16h30-17h00",
  ];

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
            {timeSlots.map((timeSlot) => (
              <TableRow>
                <TableCell align="left">{timeSlot}</TableCell>
                {/* {competition &&
                  competition.juries.map((jury) => (
                    <SessionCell teams={teams} />
                  ))} */}
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </>
    );
}
