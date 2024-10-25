import { RefObject} from "react";

// used to change display mode in tables
export type Mode = "edit" | "consult" | "create";

// used to control the snackbar globally
export type SnackStatus = {
  open: boolean;
  message: string;
  severity: "error" | "success" | "warning";
};

export type BooleanMap = {
  [key :string]: boolean;
};

export type RefMap = {
  [key :string]: RefObject<HTMLInputElement>;
};