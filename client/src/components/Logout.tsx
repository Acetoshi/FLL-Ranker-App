import { Button } from "@mui/material";
// import { useAuth } from "../hooks/useAuth";

export default function Logout() {

  const submitLogout = async () => {
    console.info("log out");
  };

  return (
    <>
      <Button variant="outlined" color="changeIt" onClick={submitLogout}>
        Déconnexion
      </Button>
    </>
  );
}
