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

export type ContactInput = {
  email: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
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
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  sendContactMessage: Scalars['Boolean'];
  signup: User;
  updateUser: User;
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


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendContactMessageArgs = {
  data: ContactInput;
};


export type MutationSignupArgs = {
  data: SignUpInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
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
  watches: Array<Watch>;
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


export type QueryWatchesArgs = {
  where: WatchWhereInput;
};

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  walletAddress?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  language: Language;
  username: Scalars['String'];
  walletAddress?: Maybe<Scalars['String']>;
  watch?: Maybe<Array<Watch>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  walletAddress?: InputMaybe<Scalars['String']>;
};

export type UserUpdateInput = {
  id: Scalars['Int'];
  walletAddress?: InputMaybe<Scalars['String']>;
};

export type UserWhereInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Watch = {
  __typename?: 'Watch';
  certificateUrl?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  lastSynced: Scalars['DateTime'];
  metadataURI?: Maybe<Scalars['String']>;
  ownerId: Scalars['Float'];
  ownershipLog?: Maybe<Array<OwnershipLog>>;
  serialNum?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type WatchCreateInput = {
  lastSynced: Scalars['DateTime'];
  metadataURI?: InputMaybe<Scalars['String']>;
  ownerId: Scalars['Int'];
  serialNum?: InputMaybe<Scalars['String']>;
};

export type WatchUpdateInput = {
  id: Scalars['Int'];
  lastSynced: Scalars['DateTime'];
  metadataURI: Scalars['String'];
  ownerId: Scalars['Int'];
  serialNum: Scalars['String'];
};

export type WatchWhereInput = {
  id?: InputMaybe<Scalars['Int']>;
  ownerId?: InputMaybe<Scalars['Int']>;
  serialNum?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  walletAddress?: InputMaybe<Scalars['String']>;
};

export type ForgotPasswordMutationVariables = Exact<{
  data: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginQueryVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutput', access_token: string, expiresAt: any, user: { __typename?: 'User', id: number, email: string, username: string, language: Language, createdAt: any, walletAddress?: string | null, watch?: Array<{ __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, certificateUrl?: string | null, ownerId: number, lastSynced: any }> | null } } };

export type RefreshUserQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type RefreshUserQuery = { __typename?: 'Query', refreshUser: { __typename?: 'LoginOutput', access_token: string, expiresAt: any, user: { __typename?: 'User', id: number, email: string, username: string, language: Language, createdAt: any, walletAddress?: string | null, watch?: Array<{ __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, certificateUrl?: string | null, ownerId: number, lastSynced: any }> | null } } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type SignupMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', email: string, id: number } };

export type SendContactMessageMutationVariables = Exact<{
  data: ContactInput;
}>;


export type SendContactMessageMutation = { __typename?: 'Mutation', sendContactMessage: boolean };

export type GetOwnershipLogsQueryVariables = Exact<{
  where: OwnershipLogWhereInput;
}>;


export type GetOwnershipLogsQuery = { __typename?: 'Query', OwnershipLogs: Array<{ __typename?: 'OwnershipLog', id: number, ownerId: number, watchId: number, timestamp: any }> };

export type GetUserQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, email: string, username: string, walletAddress?: string | null, createdAt: any, language: Language, watch?: Array<{ __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, ownerId: number, lastSynced: any }> | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, username: string, walletAddress?: string | null } };

export type ChangeWatchOwnershipMutationVariables = Exact<{
  data: WatchUpdateInput;
}>;


export type ChangeWatchOwnershipMutation = { __typename?: 'Mutation', changeWatchOwnership: { __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, ownerId: number, lastSynced: any } };

export type CreateWatchMutationVariables = Exact<{
  data: WatchCreateInput;
}>;


export type CreateWatchMutation = { __typename?: 'Mutation', createWatch: { __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, certificateUrl?: string | null, ownerId: number, lastSynced: any } };

export type GetWatchQueryVariables = Exact<{
  where: WatchWhereInput;
}>;


export type GetWatchQuery = { __typename?: 'Query', watch: { __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, certificateUrl?: string | null, ownerId: number, lastSynced: any, user?: { __typename?: 'User', id: number, username: string, email: string, walletAddress?: string | null } | null, ownershipLog?: Array<{ __typename?: 'OwnershipLog', id: number, ownerId: number, timestamp: any }> | null } };

export type GetWatchesQueryVariables = Exact<{
  where: WatchWhereInput;
}>;


export type GetWatchesQuery = { __typename?: 'Query', watches: Array<{ __typename?: 'Watch', id: number, serialNum?: string | null, metadataURI?: string | null, certificateUrl?: string | null, ownerId: number, lastSynced: any, user?: { __typename?: 'User', id: number, username: string, email: string, walletAddress?: string | null } | null, ownershipLog?: Array<{ __typename?: 'OwnershipLog', id: number, ownerId: number, timestamp: any }> | null }> };


export const ForgotPasswordDocument = gql`
    mutation forgotPassword($data: ForgotPasswordInput!) {
  forgotPassword(data: $data)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
        certificateUrl
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
        certificateUrl
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
export const ResetPasswordDocument = gql`
    mutation resetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
export const SendContactMessageDocument = gql`
    mutation sendContactMessage($data: ContactInput!) {
  sendContactMessage(data: $data)
}
    `;
export type SendContactMessageMutationFn = Apollo.MutationFunction<SendContactMessageMutation, SendContactMessageMutationVariables>;

/**
 * __useSendContactMessageMutation__
 *
 * To run a mutation, you first call `useSendContactMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendContactMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendContactMessageMutation, { data, loading, error }] = useSendContactMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendContactMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendContactMessageMutation, SendContactMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendContactMessageMutation, SendContactMessageMutationVariables>(SendContactMessageDocument, options);
      }
export type SendContactMessageMutationHookResult = ReturnType<typeof useSendContactMessageMutation>;
export type SendContactMessageMutationResult = Apollo.MutationResult<SendContactMessageMutation>;
export type SendContactMessageMutationOptions = Apollo.BaseMutationOptions<SendContactMessageMutation, SendContactMessageMutationVariables>;
export const GetOwnershipLogsDocument = gql`
    query getOwnershipLogs($where: OwnershipLogWhereInput!) {
  OwnershipLogs(where: $where) {
    id
    ownerId
    watchId
    timestamp
  }
}
    `;

/**
 * __useGetOwnershipLogsQuery__
 *
 * To run a query within a React component, call `useGetOwnershipLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnershipLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnershipLogsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetOwnershipLogsQuery(baseOptions: Apollo.QueryHookOptions<GetOwnershipLogsQuery, GetOwnershipLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOwnershipLogsQuery, GetOwnershipLogsQueryVariables>(GetOwnershipLogsDocument, options);
      }
export function useGetOwnershipLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnershipLogsQuery, GetOwnershipLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOwnershipLogsQuery, GetOwnershipLogsQueryVariables>(GetOwnershipLogsDocument, options);
        }
export type GetOwnershipLogsQueryHookResult = ReturnType<typeof useGetOwnershipLogsQuery>;
export type GetOwnershipLogsLazyQueryHookResult = ReturnType<typeof useGetOwnershipLogsLazyQuery>;
export type GetOwnershipLogsQueryResult = Apollo.QueryResult<GetOwnershipLogsQuery, GetOwnershipLogsQueryVariables>;
export const GetUserDocument = gql`
    query getUser($where: UserWhereInput!) {
  user(where: $where) {
    id
    email
    username
    walletAddress
    createdAt
    language
    watch {
      id
      serialNum
      metadataURI
      ownerId
      lastSynced
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserUpdateInput!) {
  updateUser(data: $data) {
    id
    email
    username
    walletAddress
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangeWatchOwnershipDocument = gql`
    mutation changeWatchOwnership($data: WatchUpdateInput!) {
  changeWatchOwnership(data: $data) {
    id
    serialNum
    metadataURI
    ownerId
    lastSynced
  }
}
    `;
export type ChangeWatchOwnershipMutationFn = Apollo.MutationFunction<ChangeWatchOwnershipMutation, ChangeWatchOwnershipMutationVariables>;

/**
 * __useChangeWatchOwnershipMutation__
 *
 * To run a mutation, you first call `useChangeWatchOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeWatchOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeWatchOwnershipMutation, { data, loading, error }] = useChangeWatchOwnershipMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeWatchOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<ChangeWatchOwnershipMutation, ChangeWatchOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeWatchOwnershipMutation, ChangeWatchOwnershipMutationVariables>(ChangeWatchOwnershipDocument, options);
      }
export type ChangeWatchOwnershipMutationHookResult = ReturnType<typeof useChangeWatchOwnershipMutation>;
export type ChangeWatchOwnershipMutationResult = Apollo.MutationResult<ChangeWatchOwnershipMutation>;
export type ChangeWatchOwnershipMutationOptions = Apollo.BaseMutationOptions<ChangeWatchOwnershipMutation, ChangeWatchOwnershipMutationVariables>;
export const CreateWatchDocument = gql`
    mutation createWatch($data: WatchCreateInput!) {
  createWatch(data: $data) {
    id
    serialNum
    metadataURI
    certificateUrl
    ownerId
    lastSynced
  }
}
    `;
export type CreateWatchMutationFn = Apollo.MutationFunction<CreateWatchMutation, CreateWatchMutationVariables>;

/**
 * __useCreateWatchMutation__
 *
 * To run a mutation, you first call `useCreateWatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWatchMutation, { data, loading, error }] = useCreateWatchMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateWatchMutation(baseOptions?: Apollo.MutationHookOptions<CreateWatchMutation, CreateWatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWatchMutation, CreateWatchMutationVariables>(CreateWatchDocument, options);
      }
export type CreateWatchMutationHookResult = ReturnType<typeof useCreateWatchMutation>;
export type CreateWatchMutationResult = Apollo.MutationResult<CreateWatchMutation>;
export type CreateWatchMutationOptions = Apollo.BaseMutationOptions<CreateWatchMutation, CreateWatchMutationVariables>;
export const GetWatchDocument = gql`
    query getWatch($where: WatchWhereInput!) {
  watch(where: $where) {
    id
    serialNum
    metadataURI
    certificateUrl
    ownerId
    lastSynced
    user {
      id
      username
      email
      walletAddress
    }
    ownershipLog {
      id
      ownerId
      timestamp
    }
  }
}
    `;

/**
 * __useGetWatchQuery__
 *
 * To run a query within a React component, call `useGetWatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWatchQuery(baseOptions: Apollo.QueryHookOptions<GetWatchQuery, GetWatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, options);
      }
export function useGetWatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWatchQuery, GetWatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, options);
        }
export type GetWatchQueryHookResult = ReturnType<typeof useGetWatchQuery>;
export type GetWatchLazyQueryHookResult = ReturnType<typeof useGetWatchLazyQuery>;
export type GetWatchQueryResult = Apollo.QueryResult<GetWatchQuery, GetWatchQueryVariables>;
export const GetWatchesDocument = gql`
    query getWatches($where: WatchWhereInput!) {
  watches(where: $where) {
    id
    serialNum
    metadataURI
    certificateUrl
    ownerId
    lastSynced
    user {
      id
      username
      email
      walletAddress
    }
    ownershipLog {
      id
      ownerId
      timestamp
    }
  }
}
    `;

/**
 * __useGetWatchesQuery__
 *
 * To run a query within a React component, call `useGetWatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWatchesQuery(baseOptions: Apollo.QueryHookOptions<GetWatchesQuery, GetWatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWatchesQuery, GetWatchesQueryVariables>(GetWatchesDocument, options);
      }
export function useGetWatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWatchesQuery, GetWatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWatchesQuery, GetWatchesQueryVariables>(GetWatchesDocument, options);
        }
export type GetWatchesQueryHookResult = ReturnType<typeof useGetWatchesQuery>;
export type GetWatchesLazyQueryHookResult = ReturnType<typeof useGetWatchesLazyQuery>;
export type GetWatchesQueryResult = Apollo.QueryResult<GetWatchesQuery, GetWatchesQueryVariables>;