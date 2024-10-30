import { gql } from "@apollo/client";

export const CREATE_NEW_JURY = gql`
  mutation CreateNewJury($data: CreateJuryInput!) {
    createNewJury(data: $data) {
      name
    }
  }
`;
export const CREATE_TEAM = gql`
  mutation createTeam($team: TeamInput!) {
    createTeam(team: $team) {
      contact
      location
      name
    }
  }
`;

export const ADD_USER_TO_JURY = gql`
  mutation AddUserToJury($data: AddUserToJuryInput!) {
    addUserToJury(data: $data) {
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
export const EDIT_TEAM = gql`
  mutation editTeam($team: TeamInput!) {
    editTeam(team: $team) {
      id
      contact
      location
      name
    }
  }
`;
