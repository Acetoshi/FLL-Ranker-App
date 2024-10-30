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

export const GET_JURY_BY_ID = gql`
  query GetJuryById($juryId: Float!) {
    getJuryById(juryId: $juryId) {
      id
      name
      users {
        id
        firstname
        lastname
        email
      }
    }
  }
`;

export const GET_ALL_TEAMS = gql`
  query GetAllTeams {
    allTeams {
      location
      name
      contact
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  query GetRoleById($roleId: Float!) {
    getRoleById(roleId: $roleId) {
      id
      label
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
