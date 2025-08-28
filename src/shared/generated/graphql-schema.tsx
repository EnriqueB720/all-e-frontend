import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum Language {
  English = 'ENGLISH',
  Spanish = 'SPANISH'
}

export type LoginOutput = {
  __typename?: 'LoginOutput';
  access_token: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeWatchOwnership: Watch;
  createUser: User;
  createWatch: Watch;
  signup: User;
};


export type MutationChangeWatchOwnershipArgs = {
  data: WatchUpdateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateWatchArgs = {
  data: WatchCreateInput;
};


export type MutationSignupArgs = {
  data: SignUpInput;
};

export type OwnershipLog = {
  __typename?: 'OwnershipLog';
  id: Scalars['Float'];
  ownerId: Scalars['Float'];
  timestamp: Scalars['DateTime'];
  watch?: Maybe<Watch>;
  watchId: Scalars['Float'];
};

export type OwnershipLogWhereInput = {
  ownerId: Scalars['Int'];
  watchId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  OwnershipLogs: Array<OwnershipLog>;
  login: LoginOutput;
  refreshUser: LoginOutput;
  user: User;
  watch: Watch;
};


export type QueryOwnershipLogsArgs = {
  where: OwnershipLogWhereInput;
};


export type QueryLoginArgs = {
  data: LoginUserInput;
};


export type QueryRefreshUserArgs = {
  data: Scalars['String'];
};


export type QueryUserArgs = {
  where: UserWhereInput;
};


export type QueryWatchArgs = {
  where: WatchWhereInput;
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  walletAddress: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  language: Language;
  username: Scalars['String'];
  walletAddress: Scalars['String'];
  watch?: Maybe<Array<Watch>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  walletAddress: Scalars['String'];
};

export type UserWhereInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Watch = {
  __typename?: 'Watch';
  id: Scalars['Float'];
  lastSynced: Scalars['DateTime'];
  metadataURI?: Maybe<Scalars['String']>;
  ownerId: Scalars['Float'];
  ownershipLog?: Maybe<Array<OwnershipLog>>;
  serialNum?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
};

export type WatchCreateInput = {
  lastSynced: Scalars['DateTime'];
  metadataURI?: InputMaybe<Scalars['String']>;
  ownerId: Scalars['Int'];
  serialNum?: InputMaybe<Scalars['Int']>;
};

export type WatchUpdateInput = {
  id: Scalars['Int'];
  lastSynced: Scalars['DateTime'];
  metadataURI: Scalars['String'];
  ownerId: Scalars['Int'];
  serialNum: Scalars['Int'];
};

export type WatchWhereInput = {
  id: Scalars['Int'];
  ownerId: Scalars['Int'];
  serialNum?: InputMaybe<Scalars['Int']>;
};

export type LoginQueryVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutput', access_token: string, expiresAt: any, user: { __typename?: 'User', id: number, email: string, username: string, language: Language, createdAt: any, walletAddress: string, watch?: Array<{ __typename?: 'Watch', id: number, serialNum?: number | null, metadataURI?: string | null, ownerId: number, lastSynced: any }> | null } } };

export type RefreshUserQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type RefreshUserQuery = { __typename?: 'Query', refreshUser: { __typename?: 'LoginOutput', access_token: string, expiresAt: any, user: { __typename?: 'User', id: number, email: string, username: string, language: Language, createdAt: any, walletAddress: string, watch?: Array<{ __typename?: 'Watch', id: number, serialNum?: number | null, metadataURI?: string | null, ownerId: number, lastSynced: any }> | null } } };

export type SignupMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', email: string, id: number } };


export const LoginDocument = gql`
    query login($data: LoginUserInput!) {
  login(data: $data) {
    access_token
    expiresAt
    user {
      id
      email
      username
      language
      createdAt
      walletAddress
      watch {
        id
        serialNum
        metadataURI
        ownerId
        lastSynced
      }
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const RefreshUserDocument = gql`
    query refreshUser($data: String!) {
  refreshUser(data: $data) {
    access_token
    expiresAt
    user {
      id
      email
      username
      language
      createdAt
      walletAddress
      watch {
        id
        serialNum
        metadataURI
        ownerId
        lastSynced
      }
    }
  }
}
    `;

/**
 * __useRefreshUserQuery__
 *
 * To run a query within a React component, call `useRefreshUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshUserQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRefreshUserQuery(baseOptions: Apollo.QueryHookOptions<RefreshUserQuery, RefreshUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshUserQuery, RefreshUserQueryVariables>(RefreshUserDocument, options);
      }
export function useRefreshUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshUserQuery, RefreshUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshUserQuery, RefreshUserQueryVariables>(RefreshUserDocument, options);
        }
export type RefreshUserQueryHookResult = ReturnType<typeof useRefreshUserQuery>;
export type RefreshUserLazyQueryHookResult = ReturnType<typeof useRefreshUserLazyQuery>;
export type RefreshUserQueryResult = Apollo.QueryResult<RefreshUserQuery, RefreshUserQueryVariables>;
export const SignupDocument = gql`
    mutation signup($data: SignUpInput!) {
  signup(data: $data) {
    email
    id
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;