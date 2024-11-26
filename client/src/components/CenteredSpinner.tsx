import { CircularProgress, Stack } from "@mui/material";

export default function CenteredSpinner(){
  return <Stack sx={{height:"80vh",alignItems:"center", justifyContent:"center"}}><CircularProgress size="4rem" /></Stack>
}