import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Outlet } from "react-router";
import NotificationProvider from "./contexts/NotificationContext";
import NavBar from "./components/NavBar";
import DialogProvider from "./contexts/DialogContext";
import "./global.css";
import Footer from "./components/Footer";
import { Stack } from "@mui/material";

const theme = createTheme({
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
          <Stack
            sx={{
              minHeight: "100vh",
              flexDirection: "column",
            }}
          >
            <NavBar />
            <Container fixed sx={{ flexGrow: 1 }}>
              <Outlet />
            </Container>
            <Footer />
          </Stack>
        </NotificationProvider>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
