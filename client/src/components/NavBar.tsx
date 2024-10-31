import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as MUILink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const pages = [
  { content: "Page d'accueil", to: "/" },
  { content: "Jurys", to: "manage/juries" },
  { content: "Equipes", to: "manage/teams" },
  { content: "Compétitions", to: "manage/competitions" },
  { content: "Tableau de bord", to: "manage" },
];

const linkStyle = {
  color: "white",
  backgroundColor: "primary.main",
  textDecoration: "none",
  width: "15%",
  textAlign: "center",
};
function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FLL
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
            {pages.map((pages) => (
              <MUILink component={RouterLink} to={pages.to} sx={linkStyle}>
                <Typography variant="body1" component="span">
                  {pages.content}
                </Typography>
              </MUILink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

