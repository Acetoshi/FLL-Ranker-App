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

// export type TeamRef = {
//   name: RefObject<HTMLInputElement>;
//   location: RefObject<HTMLInputElement>;
//   contact: RefObject<HTMLInputElement>;
// };

export type BtnCRUDProps = {
  type: "add" | "edit" | "delete";
  disabled?: boolean;
  handleClick: () => void;
  // teamId?: number;
  // inputError: BooleanMap;
  // setInputError: Dispatch<SetStateAction<BooleanMap>>;
  // inputRefs: RefMap;
  // validateInput: (inputRef: RefObject<HTMLInputElement>) => boolean;
  // setDisplayMode: Dispatch<SetStateAction<Mode>>;
};
