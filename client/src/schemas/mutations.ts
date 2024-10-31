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

export const CREATE_COMPETITION = gql`
  mutation CreateCompetition($competition: CompetitionInput!) {
    createCompetition(competition: $competition) {
      name
      location
      date
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
