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
import SessionCell from "../components/SessionCell";

export default function CompetitionsManagement() {
  const { competitionId } = useParams();

  const { loading, error, data } = useGetCompetitionByIdQuery({
    variables: { competitionId: parseInt(competitionId as string) },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  // aliasing the data for legibility
  const competition = data?.getCompetitionById;
  const teams = data?.getCompetitionById.teams;

  const stickyColumnStyle = {
    position: "sticky",
    left: 0,
    background: "white",
    borderRight: "1px solid lightgrey",
    zIndex: "1 !important",
  };

  const timeSlots = [
    { startTime: "09h00", endTime: "09h45" },
    { startTime: "09h45", endTime: "10h30" },
    { startTime: "10h30", endTime: "11h15" },
    { startTime: "11h15", endTime: "12h00" },
    { startTime: "12h00", endTime: "12h45" },
    { startTime: "12h45", endTime: "13h30" },
    { startTime: "13h30", endTime: "14h15" },
    { startTime: "14h15", endTime: "15h00" },
    { startTime: "15h00", endTime: "15h45" },
    { startTime: "15h45", endTime: "16h30" },
    { startTime: "16h30", endTime: "17h00" },
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
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            aria-label="Liste des jurys"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Créneau</TableCell>
                {competition &&
                  competition.juries.map((jury) => (
                    <TableCell key={`jury-${jury.id}`} align="center">
                      {jury.name}
                    </TableCell>
                  ))}
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            {timeSlots.map((timeSlot) => (
              <TableRow>
                <TableCell align="center" sx={stickyColumnStyle}>
                  {`${timeSlot.startTime}\n${timeSlot.endTime}`}
                </TableCell>
                {competition &&
                  competition.juries.map((jury) => (
                    <SessionCell
                      juryId={jury.id}
                      competitionId={parseInt(competitionId as string)}
                      startTime={timeSlot.startTime}
                      endTime={timeSlot.endTime}
                      teams={teams}
                    />
                  ))}
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </>
    );
}
