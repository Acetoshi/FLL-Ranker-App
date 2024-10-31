import { useGetAllTeamsQuery } from "../types/graphql-types";
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
import TeamRow from "../components/TeamRow";


export default function TeamsManagement() {
  const { loading, error, data, refetch } = useGetAllTeamsQuery();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

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
            Gestion des équipes
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Provenance</TableCell>
                <TableCell align="right" style={{ minWidth: 250 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.allTeams.map((team) => (
                  <TeamRow
                    key={team.id}
                    mode={"consult"}
                    team={team}
                    refetch={refetch}
                  />
                ))}
              <TeamRow
                mode={"create"}
                refetch={refetch}
              />
            </TableBody>
          </Table>
        </TableContainer>


      </>
    );
}
