import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Grid size={12}>
        <NavBar/>
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
    </>
  );
}

export default App;
