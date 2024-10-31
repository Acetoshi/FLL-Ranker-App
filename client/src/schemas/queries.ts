import { gql } from "@apollo/client";

export const GET_JURIES = gql`
  query GetAllJuries {
    getAllJuries {
      id
      name
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

export const GET_COMPETITIONS = gql`
  query GetAllCompetitions {
    getAllCompetitions {
      id
      name
      location
      date
    }
  }
`;
