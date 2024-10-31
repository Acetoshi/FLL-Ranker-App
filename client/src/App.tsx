import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { Outlet } from "react-router";
import NotificationProvider from "./contexts/NotificationContext";
import NavBar from "./components/NavBar";
import DialogProvider from "./contexts/DialogContext";

function App() {
  return (
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
  );
}

export default App;
