import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link as MUILink } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import Logout from "./Logout";


function NavBar() {
  const { user } = useAuth();
  // needed despite the existence of Navlink to have only one underlined link even though routes are nested
  const location = useLocation();

  // display different links based on the user's role
  const getPages = () => {
    if (user?.role === "Organisateur") {
      return [
        { content: "Utilisateurs", to: "/manage/users" },
        { content: "Compétitions", to: "/manage/competitions" },
      ];
    } else if (user?.role === "Juré") {
      return [{ content: "Tableau de bord", to: "/juries" }];
    }
    return [];
  };

  return (
    <AppBar
      color="secondary"
      position="static"
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MUILink
        color="secondary.contrastText"
        component={RouterLink}
        to={"/"}
        variant="h6"
        sx={{
          textTransform: "uppercase",
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
      </MUILink>

      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          gap: "16px",
        }}
      >
        {getPages().map((page) => (
          <MUILink
            key={page.to}
            color="secondary.contrastText"
            component={RouterLink}
            to={page.to}
            variant="body1"
            sx={{
              textTransform: "uppercase",
              textDecoration:
                location.pathname === page.to ? "underline" : "none",
            }}
          >
            {page.content}
          </MUILink>
        ))}
        {user && `${user.firstname} ${user.lastname}`}
        {user ? <Logout /> : <Login />}
      </Box>
    </AppBar>
  );
}
export default NavBar;
