import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useDialog } from "../hooks/useDialog";
import { useNotification } from "../hooks/useNotification";

export default function Logout() {
  const { handleLogout } = useAuth();
  const { askUser } = useDialog();
  const { notifySuccess } = useNotification();
  const navigate = useNavigate();

  const submitLogout = async () => {
    const userConfirms = await askUser(
      `Se déconnecter ?`,
      "Vous serez redirigé.e vers la page d'accueil"
    );

    if (userConfirms) {
      const logout = await handleLogout();
      if (logout) {
        notifySuccess(`Vous êtes déconnecté`);
        navigate("/");
      }
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          //TODO : this needs to be refactored into theme to be more DRY
          color: "white", // Set text color to white
          borderColor: "white", // Set border color to white
        }}
        onClick={submitLogout}
      >
        Déconnexion
      </Button>
    </>
  );
}
