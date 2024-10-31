import { gql } from "@apollo/client";

export const GET_JURIES = gql`
  query GetAllJuries {
    getAllJuries {
      id
      name
      users {
        id
        email
        firstname
        lastname
      }
    }
  }
`;

export const GET_ALL_TEAMS = gql`
  query GetAllTeams {
    allTeams {
      id
      location
      name
      contact
    }
  }
`;

export const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole($roleId: Float!) {
    getUsersByRole(roleId: $roleId) {
      id
      firstname
      lastname
      email
      role {
        id
        label
      }
      juries {
        id
        name
      }
    }
  }
`;
