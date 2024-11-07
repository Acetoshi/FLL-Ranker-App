import { Link, useLocation } from "react-router-dom";
import { Stack } from "@mui/material";

type MiniNavbarType = {
  competition: number;
};

export default function MiniNavbar({ competition }: MiniNavbarType) {
  const location = useLocation();
  const currentPage = location.pathname.split("/").at(-1);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Link to={`/manage/competitions`}>Tableau de bord</Link>
        {currentPage !== "juries" && (
          <Link to={`/manage/competitions/${competition}/juries`}>Jurys</Link>
        )}
        {currentPage !== "competitions" && (
          <Link to={`/manage/competitions/${competition}/teams`}>Equipes</Link>
        )}
        {currentPage !== "planning" && (
          <Link to={`/manage/competitions/${competition}/planning`}>
            Planning
          </Link>
        )}
      </Stack>
    </div>
  );
}
