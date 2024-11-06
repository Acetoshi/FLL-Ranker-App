import { RefObject } from "react";
import {
  Exact,
  GetAllTeamsQuery,
  Team,
  GetJuriesOfCompetitionQuery,
} from "./graphql-types";
import { ApolloQueryResult } from "@apollo/client";

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
  refetch: (
    variables?: Partial<Exact<{ [key: string]: never }>> | undefined,
  ) => Promise<ApolloQueryResult<GetAllTeamsQuery>>;
};

export type BtnCRUDProps = {
  type: "add" | "edit" | "delete" | "save" | "cancel";
  disabled?: boolean;
  handleClick: () => void;
};

export type DataHandlerResult = {
  success: boolean;
  message: string | null | undefined;
};

export type JuriesOfCompetitionRefetchType = (
  variables?: Partial<Exact<{ competitionId: number }>> | undefined,
) => Promise<ApolloQueryResult<GetJuriesOfCompetitionQuery>>;
