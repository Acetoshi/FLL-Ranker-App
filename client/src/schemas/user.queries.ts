import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      success
      userDetails {
        email
        firstname
        lastname
        role
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
