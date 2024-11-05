import { useParams } from "react-router";
import { Typography, Box } from "@mui/material";
import { useGetCompetitionByIdQuery } from "../types/graphql-types";

export default function CompetitionsManagement() {
  const { competitionId } = useParams();

  const { loading, error, data } = useGetCompetitionByIdQuery({
    variables: { competitionId: parseInt(competitionId as string) },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  // aliasing the data for legibility
  const competition = data ? data.getCompetitionById[0] : undefined;

  if (data)
    return (
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
    );
}
