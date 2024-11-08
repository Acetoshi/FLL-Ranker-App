import { Outlet } from "react-router";
import NotificationProvider from "./contexts/NotificationContext";
import DialogProvider from "./contexts/DialogContext";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import "./global.css";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#1879CD",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#393939",
      contrastText: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <NotificationProvider>
          <Grid size={12}>
            <NavBar />
          </Grid>
          <Container fixed>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Outlet />
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Grid size={12}>
            <div>FLL Ranker 2024</div>
          </Grid>
        </NotificationProvider>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
