import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from '@mui/icons-material/Save';

import { BtnCRUDProps } from "../types/types";

// This button is used to handle CRUD actions
export default function BtnCUD({
  type,
  disabled=false,
  handleClick
}: BtnCRUDProps) {

  const getButtonColor = () => {
    switch (type) {
      case "edit":
        return "success";
      case "delete":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <Button
      color={getButtonColor()}
      disabled={disabled}  // ex (inputError.name || inputError.contact || inputError.location)
      variant={type === "delete" ? "outlined" : "contained"}
      onClick={handleClick}
      startIcon={
        (type === "delete" && <DeleteIcon />) || (type === "add" && <AddIcon />) || (type === "edit" && <SaveIcon />)
      }
    >
      {type === "add" && "AJOUTER"}
      {type === "edit" && "SAUVEGARDER"}
      {type === "delete" && "SUPPRIMER"}
    </Button>
  );
}
