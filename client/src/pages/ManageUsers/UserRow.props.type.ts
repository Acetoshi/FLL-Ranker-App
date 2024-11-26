import { User } from "../../types/graphql-types";
import { Mode } from "../../types/types";

export type UserRowProps = {
  user?: Partial<User>;
  mode: Mode;
  // refetch: (
  //   variables?: Partial<Exact<{ [key: string]: never }>> | undefined
  // ) => Promise<ApolloQueryResult<GetTeamsOfCompetitionByIdQuery>>;
};
