import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Competition = {
  __typename?: 'Competition';
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateJuryInput = {
  name: Scalars['String']['input'];
};

export type DeleteResponseStatus = {
  __typename?: 'DeleteResponseStatus';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Jury = {
  __typename?: 'Jury';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewJury: Jury;
  createTeam: Team;
  deleteTeam: DeleteResponseStatus;
  editTeam: Team;
};


export type MutationCreateNewJuryArgs = {
  data: CreateJuryInput;
};


export type MutationCreateTeamArgs = {
  team: TeamInput;
};


export type MutationDeleteTeamArgs = {
  team: TeamIdInput;
};


export type MutationEditTeamArgs = {
  team: TeamInput;
};

export type Query = {
  __typename?: 'Query';
  allTeams: Array<Team>;
  getAllCompetitions: Array<Competition>;
  getAllJuries: Array<Jury>;
};

export type Team = {
  __typename?: 'Team';
  contact: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TeamIdInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
};

export type TeamInput = {
  contact: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateNewJuryMutationVariables = Exact<{
  data: CreateJuryInput;
}>;


export type CreateNewJuryMutation = { __typename?: 'Mutation', createNewJury: { __typename?: 'Jury', name: string } };

export type CreateTeamMutationVariables = Exact<{
  team: TeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', contact: string, location: string, name: string } };

export type EditTeamMutationVariables = Exact<{
  team: TeamInput;
}>;


export type EditTeamMutation = { __typename?: 'Mutation', editTeam: { __typename?: 'Team', id: number, contact: string, location: string, name: string } };

export type DeleteTeamMutationVariables = Exact<{
  team: TeamIdInput;
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'DeleteResponseStatus', success: boolean, message?: string | null } };

export type GetAllJuriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllJuriesQuery = { __typename?: 'Query', getAllJuries: Array<{ __typename?: 'Jury', id: string, name: string }> };

export type GetAllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTeamsQuery = { __typename?: 'Query', allTeams: Array<{ __typename?: 'Team', id: number, location: string, name: string, contact: string }> };

export type GetAllCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCompetitionsQuery = { __typename?: 'Query', getAllCompetitions: Array<{ __typename?: 'Competition', id: string, name: string, location: string, date: string }> };


export const CreateNewJuryDocument = gql`
    mutation CreateNewJury($data: CreateJuryInput!) {
  createNewJury(data: $data) {
    name
  }
}
    `;
export type CreateNewJuryMutationFn = Apollo.MutationFunction<CreateNewJuryMutation, CreateNewJuryMutationVariables>;

/**
 * __useCreateNewJuryMutation__
 *
 * To run a mutation, you first call `useCreateNewJuryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewJuryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewJuryMutation, { data, loading, error }] = useCreateNewJuryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewJuryMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewJuryMutation, CreateNewJuryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewJuryMutation, CreateNewJuryMutationVariables>(CreateNewJuryDocument, options);
      }
export type CreateNewJuryMutationHookResult = ReturnType<typeof useCreateNewJuryMutation>;
export type CreateNewJuryMutationResult = Apollo.MutationResult<CreateNewJuryMutation>;
export type CreateNewJuryMutationOptions = Apollo.BaseMutationOptions<CreateNewJuryMutation, CreateNewJuryMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($team: TeamInput!) {
  createTeam(team: $team) {
    contact
    location
    name
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      team: // value for 'team'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const EditTeamDocument = gql`
    mutation editTeam($team: TeamInput!) {
  editTeam(team: $team) {
    id
    contact
    location
    name
  }
}
    `;
export type EditTeamMutationFn = Apollo.MutationFunction<EditTeamMutation, EditTeamMutationVariables>;

/**
 * __useEditTeamMutation__
 *
 * To run a mutation, you first call `useEditTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTeamMutation, { data, loading, error }] = useEditTeamMutation({
 *   variables: {
 *      team: // value for 'team'
 *   },
 * });
 */
export function useEditTeamMutation(baseOptions?: Apollo.MutationHookOptions<EditTeamMutation, EditTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTeamMutation, EditTeamMutationVariables>(EditTeamDocument, options);
      }
export type EditTeamMutationHookResult = ReturnType<typeof useEditTeamMutation>;
export type EditTeamMutationResult = Apollo.MutationResult<EditTeamMutation>;
export type EditTeamMutationOptions = Apollo.BaseMutationOptions<EditTeamMutation, EditTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation deleteTeam($team: TeamIdInput!) {
  deleteTeam(team: $team) {
    success
    message
  }
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      team: // value for 'team'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const GetAllJuriesDocument = gql`
    query GetAllJuries {
  getAllJuries {
    id
    name
  }
}
    `;

/**
 * __useGetAllJuriesQuery__
 *
 * To run a query within a React component, call `useGetAllJuriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllJuriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllJuriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllJuriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllJuriesQuery, GetAllJuriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllJuriesQuery, GetAllJuriesQueryVariables>(GetAllJuriesDocument, options);
      }
export function useGetAllJuriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllJuriesQuery, GetAllJuriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllJuriesQuery, GetAllJuriesQueryVariables>(GetAllJuriesDocument, options);
        }
export function useGetAllJuriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllJuriesQuery, GetAllJuriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllJuriesQuery, GetAllJuriesQueryVariables>(GetAllJuriesDocument, options);
        }
export type GetAllJuriesQueryHookResult = ReturnType<typeof useGetAllJuriesQuery>;
export type GetAllJuriesLazyQueryHookResult = ReturnType<typeof useGetAllJuriesLazyQuery>;
export type GetAllJuriesSuspenseQueryHookResult = ReturnType<typeof useGetAllJuriesSuspenseQuery>;
export type GetAllJuriesQueryResult = Apollo.QueryResult<GetAllJuriesQuery, GetAllJuriesQueryVariables>;
export const GetAllTeamsDocument = gql`
    query GetAllTeams {
  allTeams {
    id
    location
    name
    contact
  }
}
    `;

/**
 * __useGetAllTeamsQuery__
 *
 * To run a query within a React component, call `useGetAllTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
      }
export function useGetAllTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
        }
export function useGetAllTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
        }
export type GetAllTeamsQueryHookResult = ReturnType<typeof useGetAllTeamsQuery>;
export type GetAllTeamsLazyQueryHookResult = ReturnType<typeof useGetAllTeamsLazyQuery>;
export type GetAllTeamsSuspenseQueryHookResult = ReturnType<typeof useGetAllTeamsSuspenseQuery>;
export type GetAllTeamsQueryResult = Apollo.QueryResult<GetAllTeamsQuery, GetAllTeamsQueryVariables>;
export const GetAllCompetitionsDocument = gql`
    query GetAllCompetitions {
  getAllCompetitions {
    id
    name
    location
    date
  }
}
    `;

/**
 * __useGetAllCompetitionsQuery__
 *
 * To run a query within a React component, call `useGetAllCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCompetitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCompetitionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>(GetAllCompetitionsDocument, options);
      }
export function useGetAllCompetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>(GetAllCompetitionsDocument, options);
        }
export function useGetAllCompetitionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>(GetAllCompetitionsDocument, options);
        }
export type GetAllCompetitionsQueryHookResult = ReturnType<typeof useGetAllCompetitionsQuery>;
export type GetAllCompetitionsLazyQueryHookResult = ReturnType<typeof useGetAllCompetitionsLazyQuery>;
export type GetAllCompetitionsSuspenseQueryHookResult = ReturnType<typeof useGetAllCompetitionsSuspenseQuery>;
export type GetAllCompetitionsQueryResult = Apollo.QueryResult<GetAllCompetitionsQuery, GetAllCompetitionsQueryVariables>;