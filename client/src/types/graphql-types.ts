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

export type CreateJuryInput = {
  name: Scalars['String']['input'];
};

export type CreateRoleInput = {
  label: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Jury = {
  __typename?: 'Jury';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Team;
  createNewJury: Jury;
  createNewRole: Role;
  createNewUser: User;
};


export type MutationCreateArgs = {
  team: TeamInput;
};


export type MutationCreateNewJuryArgs = {
  data: CreateJuryInput;
};


export type MutationCreateNewRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateNewUserArgs = {
  data: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  allTeams: Array<Team>;
  getAllJuries: Array<Jury>;
  getAllRoles: Array<Role>;
  getAllUsers: Array<User>;
  getRoleById: Role;
  getUsersByRole: Array<User>;
  getUsersOfJury: Array<Jury>;
};


export type QueryGetRoleByIdArgs = {
  roleId: Scalars['Float']['input'];
};


export type QueryGetUsersByRoleArgs = {
  roleId: Scalars['Float']['input'];
};


export type QueryGetUsersOfJuryArgs = {
  juryId: Scalars['Float']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type Team = {
  __typename?: 'Team';
  contact: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TeamInput = {
  contact: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  juries: Array<Jury>;
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
};

export type CreateNewJuryMutationVariables = Exact<{
  data: CreateJuryInput;
}>;


export type CreateNewJuryMutation = { __typename?: 'Mutation', createNewJury: { __typename?: 'Jury', name: string } };

export type CreateTeamMutationVariables = Exact<{
  team: TeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', create: { __typename?: 'Team', contact: string, location: string, name: string } };

export type GetAllJuriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllJuriesQuery = { __typename?: 'Query', getAllJuries: Array<{ __typename?: 'Jury', id: number, name: string, users: Array<{ __typename?: 'User', id: number, email: string, firstname: string, lastname: string }> }> };

export type GetAllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTeamsQuery = { __typename?: 'Query', allTeams: Array<{ __typename?: 'Team', location: string, name: string, contact: string }> };

export type GetRoleByIdQueryVariables = Exact<{
  roleId: Scalars['Float']['input'];
}>;


export type GetRoleByIdQuery = { __typename?: 'Query', getRoleById: { __typename?: 'Role', id: number, label: string } };

export type GetUsersByRoleQueryVariables = Exact<{
  roleId: Scalars['Float']['input'];
}>;


export type GetUsersByRoleQuery = { __typename?: 'Query', getUsersByRole: Array<{ __typename?: 'User', id: number, firstname: string, lastname: string, email: string, role: { __typename?: 'Role', id: number, label: string }, juries: Array<{ __typename?: 'Jury', id: number, name: string }> }> };


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
  create(team: $team) {
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
export const GetAllJuriesDocument = gql`
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
export const GetRoleByIdDocument = gql`
    query GetRoleById($roleId: Float!) {
  getRoleById(roleId: $roleId) {
    id
    label
  }
}
    `;

/**
 * __useGetRoleByIdQuery__
 *
 * To run a query within a React component, call `useGetRoleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleByIdQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useGetRoleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables> & ({ variables: GetRoleByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
      }
export function useGetRoleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
        }
export function useGetRoleByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
        }
export type GetRoleByIdQueryHookResult = ReturnType<typeof useGetRoleByIdQuery>;
export type GetRoleByIdLazyQueryHookResult = ReturnType<typeof useGetRoleByIdLazyQuery>;
export type GetRoleByIdSuspenseQueryHookResult = ReturnType<typeof useGetRoleByIdSuspenseQuery>;
export type GetRoleByIdQueryResult = Apollo.QueryResult<GetRoleByIdQuery, GetRoleByIdQueryVariables>;
export const GetUsersByRoleDocument = gql`
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

/**
 * __useGetUsersByRoleQuery__
 *
 * To run a query within a React component, call `useGetUsersByRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByRoleQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useGetUsersByRoleQuery(baseOptions: Apollo.QueryHookOptions<GetUsersByRoleQuery, GetUsersByRoleQueryVariables> & ({ variables: GetUsersByRoleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>(GetUsersByRoleDocument, options);
      }
export function useGetUsersByRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>(GetUsersByRoleDocument, options);
        }
export function useGetUsersByRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>(GetUsersByRoleDocument, options);
        }
export type GetUsersByRoleQueryHookResult = ReturnType<typeof useGetUsersByRoleQuery>;
export type GetUsersByRoleLazyQueryHookResult = ReturnType<typeof useGetUsersByRoleLazyQuery>;
export type GetUsersByRoleSuspenseQueryHookResult = ReturnType<typeof useGetUsersByRoleSuspenseQuery>;
export type GetUsersByRoleQueryResult = Apollo.QueryResult<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>;