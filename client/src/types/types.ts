import { Dispatch, SetStateAction, RefObject } from "react";
import { Team } from "./graphql-types";

// used to change display mode in tables
export type Mode = "edit" | "consult" | "create";

// used to control the snackbar globally
export type Notification = {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

export type BooleanMap = {
  [key: string]: boolean;
};

export type RefMap = {
  [key: string]: RefObject<HTMLInputElement>;
};

export type TeamRowProps = {
  team: Team;
  mode: Mode;
  setDisplayMode: Dispatch<SetStateAction<Mode>>;
  setSnackStatus: Dispatch<SetStateAction<SnackStatus>>;
};

export type BtnTeamProps = {
  type: "add" | "edit";
  teamId?: number;
  inputError: BooleanMap;
  setInputError: Dispatch<SetStateAction<BooleanMap>>;
  inputRefs: RefMap;
  validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean;
  setDisplayMode: Dispatch<SetStateAction<Mode>>;
  setSnackStatus: Dispatch<SetStateAction<SnackStatus>>;
};
