import { Link, useLocation, useParams } from "react-router-dom";
import { Stack, Link as MUILink, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AlarmIcon from "@mui/icons-material/Alarm";

const buttonStyle = {
  display: "inline-block",
  padding: ".5em .75em",
  color: "primary.contrastText",
  backgroundColor: "primary.main",
  textTransform: "uppercase",
  borderRadius: "4px",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "primary.dark",
  },
};

export default function MiniNavbar() {
  const { competitionId } = useParams();
  const location = useLocation();
  const currentPage = location.pathname.split("/").at(-1);

  return (
    <div style={{ marginBottom: "1em" }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
        <MUILink component={Link} to={`/manage/competitions`} sx={buttonStyle}>
          <Typography variant="body1" component="span">
            <Stack direction="row" spacing={1}>
              <DashboardIcon /> <span>Tableau de bord</span>
            </Stack>
          </Typography>
        </MUILink>
        {currentPage !== "juries" && (
          <MUILink
            component={Link}
            to={`/manage/competitions/${competitionId}/juries`}
            sx={buttonStyle}
          >
            <Typography variant="body1" component="span">
              <Stack direction="row" spacing={1}>
                <Diversity3Icon /> <span>Jurys</span>
              </Stack>
            </Typography>
          </MUILink>
        )}
        {currentPage !== "teams" && (
          <MUILink
            component={Link}
            to={`/manage/competitions/${competitionId}/teams`}
            sx={buttonStyle}
          >
            <Typography variant="body1" component="span">
              <Stack direction="row" spacing={1}>
                <Diversity3Icon /> <span>Equipes</span>
              </Stack>
            </Typography>
          </MUILink>
        )}
        {currentPage !== "planning" && (
          <MUILink
            component={Link}
            to={`/manage/competitions/${competitionId}/planning`}
            sx={buttonStyle}
          >
            <Typography variant="body1" component="span">
              <Stack direction="row" spacing={1}>
                <AlarmIcon /> <span>Planning</span>
              </Stack>
            </Typography>
          </MUILink>
        )}
      </Stack>
    </div>
  );
}
