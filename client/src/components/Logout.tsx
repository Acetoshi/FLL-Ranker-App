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
      "Vous serez redirigé vers la page d'accueil"
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
      <Button variant="outlined" color="changeIt" onClick={submitLogout}>
        Déconnexion
      </Button>
    </>
  );
}
