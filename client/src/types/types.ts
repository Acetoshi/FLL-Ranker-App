import { RefObject } from "react";
import { Team } from "./graphql-types";

// used to change display mode in tables
export type Mode = "edit" | "consult" | "create";

// used to control the snackbar globally
export type Notification = {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

export type BooleanMap = {
  [key: string]: boolean;
};

export type RefMap = {
  [key: string]: RefObject<HTMLInputElement>;
};

export type TeamRowProps = {
  team?: Team;
  mode: Mode;
};

export type BtnCRUDProps = {
  type: "add" | "edit" | "delete" | "save" | "cancel";
  disabled?: boolean;
  handleClick: () => void;
};
