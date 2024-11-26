import { useAllUsersQuery } from "../types/graphql-types";
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
import CenteredSpinner from "../components/CenteredSpinner";

export default function UsersManagement() {
  const { loading, error, data } = useAllUsersQuery();

  if (loading) return <CenteredSpinner />;

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
            Gestion des utilisateurs
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            aria-label="liste des utilisateurs"
          >
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
                data.allUsers.reduce((aggregat: JSX.Element[], user) => {
                  aggregat.unshift(<p>{user.email}</p>);
                  return aggregat;
                }, [])}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
}
