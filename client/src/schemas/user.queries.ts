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

export const GET_USER_DETAILS = gql`
  query UserData {
    userData {
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

export const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      email
      firstname
      id
      lastname
      role {
        id
        label
      }
    }
  }
`;
