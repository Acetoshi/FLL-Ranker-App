import { gql } from "@apollo/client";

export const GET_TEAMS_OF_COMPETITION_BY_ID = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;
