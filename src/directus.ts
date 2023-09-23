import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** ISO8601 Date values */
  Date: { input: any; output: any; }
  /** Hashed string values */
  Hash: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A Float or a String */
  GraphQLStringOrFloat: { input: any; output: any; }
  /** BigInt value */
  GraphQLBigInt: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  days: Array<Days>;
  days_by_id?: Maybe<Days>;
  days_aggregated: Array<Days_Aggregated>;
  rooms: Array<Rooms>;
  rooms_by_id?: Maybe<Rooms>;
  rooms_aggregated: Array<Rooms_Aggregated>;
  sessions_rooms: Array<Sessions_Rooms>;
  sessions_rooms_by_id?: Maybe<Sessions_Rooms>;
  sessions_rooms_aggregated: Array<Sessions_Rooms_Aggregated>;
  comments_rooms: Array<Comments_Rooms>;
  comments_rooms_by_id?: Maybe<Comments_Rooms>;
  comments_rooms_aggregated: Array<Comments_Rooms_Aggregated>;
  comments: Array<Comments>;
  comments_by_id?: Maybe<Comments>;
  comments_aggregated: Array<Comments_Aggregated>;
  session_types: Array<Session_Types>;
  session_types_by_id?: Maybe<Session_Types>;
  session_types_aggregated: Array<Session_Types_Aggregated>;
  sessions: Array<Sessions>;
  sessions_by_id?: Maybe<Sessions>;
  sessions_aggregated: Array<Sessions_Aggregated>;
};


export type QueryDaysArgs = {
  filter?: InputMaybe<Days_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDays_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDays_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Days_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryRoomsArgs = {
  filter?: InputMaybe<Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRooms_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRooms_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Rooms_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySessions_RoomsArgs = {
  filter?: InputMaybe<Sessions_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySessions_Rooms_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySessions_Rooms_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Sessions_Rooms_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryComments_RoomsArgs = {
  filter?: InputMaybe<Comments_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryComments_Rooms_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryComments_Rooms_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Comments_Rooms_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCommentsArgs = {
  filter?: InputMaybe<Comments_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryComments_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryComments_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Comments_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySession_TypesArgs = {
  filter?: InputMaybe<Session_Types_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySession_Types_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySession_Types_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Session_Types_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySessionsArgs = {
  filter?: InputMaybe<Sessions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySessions_By_IdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySessions_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  filter?: InputMaybe<Sessions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Days = {
  __typename?: 'days';
  id: Scalars['ID']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  date_func?: Maybe<Date_Functions>;
  display?: Maybe<Scalars['String']['output']>;
  sessions?: Maybe<Array<Maybe<Sessions>>>;
  sessions_func?: Maybe<Count_Functions>;
  comments?: Maybe<Array<Maybe<Comments>>>;
  comments_func?: Maybe<Count_Functions>;
};


export type DaysSessionsArgs = {
  filter?: InputMaybe<Sessions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type DaysCommentsArgs = {
  filter?: InputMaybe<Comments_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Date_Functions = {
  __typename?: 'date_functions';
  year?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  week?: Maybe<Scalars['Int']['output']>;
  day?: Maybe<Scalars['Int']['output']>;
  weekday?: Maybe<Scalars['Int']['output']>;
};

export type Sessions = {
  __typename?: 'sessions';
  id: Scalars['ID']['output'];
  user_created?: Maybe<Directus_Users>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  user_updated?: Maybe<Directus_Users>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  title?: Maybe<Scalars['String']['output']>;
  referee?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Session_Types>;
  time_start?: Maybe<Scalars['String']['output']>;
  time_start_func?: Maybe<Time_Functions>;
  time_end?: Maybe<Scalars['String']['output']>;
  time_end_func?: Maybe<Time_Functions>;
  day?: Maybe<Days>;
  cancelled?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  referee_long?: Maybe<Scalars['String']['output']>;
  title_long?: Maybe<Scalars['String']['output']>;
  rooms?: Maybe<Array<Maybe<Sessions_Rooms>>>;
  rooms_func?: Maybe<Count_Functions>;
};


export type SessionsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type SessionsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type SessionsTypeArgs = {
  filter?: InputMaybe<Session_Types_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type SessionsDayArgs = {
  filter?: InputMaybe<Days_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type SessionsRoomsArgs = {
  filter?: InputMaybe<Sessions_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Users = {
  __typename?: 'directus_users';
  id: Scalars['ID']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['Hash']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  tags_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  language?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  tfa_secret?: Maybe<Scalars['Hash']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Directus_Roles>;
  token?: Maybe<Scalars['Hash']['output']>;
  last_access?: Maybe<Scalars['Date']['output']>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_page?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  external_identifier?: Maybe<Scalars['String']['output']>;
  auth_data?: Maybe<Scalars['JSON']['output']>;
  auth_data_func?: Maybe<Count_Functions>;
  email_notifications?: Maybe<Scalars['Boolean']['output']>;
};


export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Directus_Files = {
  __typename?: 'directus_files';
  id: Scalars['ID']['output'];
  storage: Scalars['String']['output'];
  filename_disk?: Maybe<Scalars['String']['output']>;
  filename_download: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  folder?: Maybe<Directus_Folders>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on?: Maybe<Scalars['Date']['output']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on?: Maybe<Scalars['Date']['output']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  charset?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['GraphQLBigInt']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  embed?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  tags_func?: Maybe<Count_Functions>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  metadata_func?: Maybe<Count_Functions>;
};


export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Folders = {
  __typename?: 'directus_folders';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Directus_Folders>;
};


export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Folders_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
};

export type String_Filter_Operators = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _contains?: InputMaybe<Scalars['String']['input']>;
  _icontains?: InputMaybe<Scalars['String']['input']>;
  _ncontains?: InputMaybe<Scalars['String']['input']>;
  _starts_with?: InputMaybe<Scalars['String']['input']>;
  _nstarts_with?: InputMaybe<Scalars['String']['input']>;
  _istarts_with?: InputMaybe<Scalars['String']['input']>;
  _nistarts_with?: InputMaybe<Scalars['String']['input']>;
  _ends_with?: InputMaybe<Scalars['String']['input']>;
  _nends_with?: InputMaybe<Scalars['String']['input']>;
  _iends_with?: InputMaybe<Scalars['String']['input']>;
  _niends_with?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Directus_Users_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  language?: InputMaybe<String_Filter_Operators>;
  theme?: InputMaybe<String_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  token?: InputMaybe<Hash_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
};

export type Hash_Filter_Operators = {
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Number_Filter_Operators = {
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
};

export type Directus_Files_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  charset?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Number_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
};

export type Date_Filter_Operators = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
};

export type Datetime_Function_Filter_Operators = {
  year?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  day?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Roles_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  year?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  week?: Maybe<Scalars['Int']['output']>;
  day?: Maybe<Scalars['Int']['output']>;
  weekday?: Maybe<Scalars['Int']['output']>;
  hour?: Maybe<Scalars['Int']['output']>;
  minute?: Maybe<Scalars['Int']['output']>;
  second?: Maybe<Scalars['Int']['output']>;
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  ip_access?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  enforce_tfa: Scalars['Boolean']['output'];
  admin_access: Scalars['Boolean']['output'];
  app_access?: Maybe<Scalars['Boolean']['output']>;
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Session_Types = {
  __typename?: 'session_types';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  background_color?: Maybe<Scalars['String']['output']>;
  text_color?: Maybe<Scalars['String']['output']>;
  requires_referee?: Maybe<Scalars['Boolean']['output']>;
};

export type Session_Types_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  background_color?: InputMaybe<String_Filter_Operators>;
  text_color?: InputMaybe<String_Filter_Operators>;
  requires_referee?: InputMaybe<Boolean_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Session_Types_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Session_Types_Filter>>>;
};

export type Time_Functions = {
  __typename?: 'time_functions';
  hour?: Maybe<Scalars['Int']['output']>;
  minute?: Maybe<Scalars['Int']['output']>;
  second?: Maybe<Scalars['Int']['output']>;
};

export type Days_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  date?: InputMaybe<Date_Filter_Operators>;
  date_func?: InputMaybe<Date_Function_Filter_Operators>;
  display?: InputMaybe<String_Filter_Operators>;
  sessions?: InputMaybe<Sessions_Filter>;
  sessions_func?: InputMaybe<Count_Function_Filter_Operators>;
  comments?: InputMaybe<Comments_Filter>;
  comments_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Days_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Days_Filter>>>;
};

export type Date_Function_Filter_Operators = {
  year?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  day?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
};

export type Sessions_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  referee?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<Session_Types_Filter>;
  time_start?: InputMaybe<String_Filter_Operators>;
  time_start_func?: InputMaybe<Time_Function_Filter_Operators>;
  time_end?: InputMaybe<String_Filter_Operators>;
  time_end_func?: InputMaybe<Time_Function_Filter_Operators>;
  day?: InputMaybe<Days_Filter>;
  cancelled?: InputMaybe<Boolean_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  referee_long?: InputMaybe<String_Filter_Operators>;
  title_long?: InputMaybe<String_Filter_Operators>;
  rooms?: InputMaybe<Sessions_Rooms_Filter>;
  rooms_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Sessions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sessions_Filter>>>;
};

export type Time_Function_Filter_Operators = {
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
};

export type Sessions_Rooms_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  sessions_id?: InputMaybe<Sessions_Filter>;
  rooms_id?: InputMaybe<Rooms_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Sessions_Rooms_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Sessions_Rooms_Filter>>>;
};

export type Rooms_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Rooms_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Rooms_Filter>>>;
};

export type Comments_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  content?: InputMaybe<String_Filter_Operators>;
  time?: InputMaybe<String_Filter_Operators>;
  time_func?: InputMaybe<Time_Function_Filter_Operators>;
  day?: InputMaybe<Days_Filter>;
  rooms?: InputMaybe<Comments_Rooms_Filter>;
  rooms_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Comments_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Comments_Filter>>>;
};

export type Comments_Rooms_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  comments_id?: InputMaybe<Comments_Filter>;
  rooms_id?: InputMaybe<Rooms_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Comments_Rooms_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Comments_Rooms_Filter>>>;
};

export type Sessions_Rooms = {
  __typename?: 'sessions_rooms';
  id: Scalars['ID']['output'];
  sessions_id?: Maybe<Sessions>;
  rooms_id?: Maybe<Rooms>;
};


export type Sessions_RoomsSessions_IdArgs = {
  filter?: InputMaybe<Sessions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Sessions_RoomsRooms_IdArgs = {
  filter?: InputMaybe<Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Rooms = {
  __typename?: 'rooms';
  id: Scalars['ID']['output'];
  sort?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Comments = {
  __typename?: 'comments';
  id: Scalars['ID']['output'];
  user_created?: Maybe<Directus_Users>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  user_updated?: Maybe<Directus_Users>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  content?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  time_func?: Maybe<Time_Functions>;
  day?: Maybe<Days>;
  rooms?: Maybe<Array<Maybe<Comments_Rooms>>>;
  rooms_func?: Maybe<Count_Functions>;
};


export type CommentsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type CommentsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type CommentsDayArgs = {
  filter?: InputMaybe<Days_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type CommentsRoomsArgs = {
  filter?: InputMaybe<Comments_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Comments_Rooms = {
  __typename?: 'comments_rooms';
  id: Scalars['ID']['output'];
  comments_id?: Maybe<Comments>;
  rooms_id?: Maybe<Rooms>;
};


export type Comments_RoomsComments_IdArgs = {
  filter?: InputMaybe<Comments_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Comments_RoomsRooms_IdArgs = {
  filter?: InputMaybe<Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Days_Aggregated = {
  __typename?: 'days_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Days_Aggregated_Count>;
  countDistinct?: Maybe<Days_Aggregated_Count>;
  avg?: Maybe<Days_Aggregated_Fields>;
  sum?: Maybe<Days_Aggregated_Fields>;
  avgDistinct?: Maybe<Days_Aggregated_Fields>;
  sumDistinct?: Maybe<Days_Aggregated_Fields>;
  min?: Maybe<Days_Aggregated_Fields>;
  max?: Maybe<Days_Aggregated_Fields>;
};

export type Days_Aggregated_Count = {
  __typename?: 'days_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Int']['output']>;
  display?: Maybe<Scalars['Int']['output']>;
  sessions?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Scalars['Int']['output']>;
};

export type Days_Aggregated_Fields = {
  __typename?: 'days_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Rooms_Aggregated = {
  __typename?: 'rooms_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Rooms_Aggregated_Count>;
  countDistinct?: Maybe<Rooms_Aggregated_Count>;
  avg?: Maybe<Rooms_Aggregated_Fields>;
  sum?: Maybe<Rooms_Aggregated_Fields>;
  avgDistinct?: Maybe<Rooms_Aggregated_Fields>;
  sumDistinct?: Maybe<Rooms_Aggregated_Fields>;
  min?: Maybe<Rooms_Aggregated_Fields>;
  max?: Maybe<Rooms_Aggregated_Fields>;
};

export type Rooms_Aggregated_Count = {
  __typename?: 'rooms_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type Rooms_Aggregated_Fields = {
  __typename?: 'rooms_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

export type Sessions_Rooms_Aggregated = {
  __typename?: 'sessions_rooms_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Sessions_Rooms_Aggregated_Count>;
  countDistinct?: Maybe<Sessions_Rooms_Aggregated_Count>;
  avg?: Maybe<Sessions_Rooms_Aggregated_Fields>;
  sum?: Maybe<Sessions_Rooms_Aggregated_Fields>;
  avgDistinct?: Maybe<Sessions_Rooms_Aggregated_Fields>;
  sumDistinct?: Maybe<Sessions_Rooms_Aggregated_Fields>;
  min?: Maybe<Sessions_Rooms_Aggregated_Fields>;
  max?: Maybe<Sessions_Rooms_Aggregated_Fields>;
};

export type Sessions_Rooms_Aggregated_Count = {
  __typename?: 'sessions_rooms_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  sessions_id?: Maybe<Scalars['Int']['output']>;
  rooms_id?: Maybe<Scalars['Int']['output']>;
};

export type Sessions_Rooms_Aggregated_Fields = {
  __typename?: 'sessions_rooms_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sessions_id?: Maybe<Scalars['Float']['output']>;
  rooms_id?: Maybe<Scalars['Float']['output']>;
};

export type Comments_Rooms_Aggregated = {
  __typename?: 'comments_rooms_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Comments_Rooms_Aggregated_Count>;
  countDistinct?: Maybe<Comments_Rooms_Aggregated_Count>;
  avg?: Maybe<Comments_Rooms_Aggregated_Fields>;
  sum?: Maybe<Comments_Rooms_Aggregated_Fields>;
  avgDistinct?: Maybe<Comments_Rooms_Aggregated_Fields>;
  sumDistinct?: Maybe<Comments_Rooms_Aggregated_Fields>;
  min?: Maybe<Comments_Rooms_Aggregated_Fields>;
  max?: Maybe<Comments_Rooms_Aggregated_Fields>;
};

export type Comments_Rooms_Aggregated_Count = {
  __typename?: 'comments_rooms_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  comments_id?: Maybe<Scalars['Int']['output']>;
  rooms_id?: Maybe<Scalars['Int']['output']>;
};

export type Comments_Rooms_Aggregated_Fields = {
  __typename?: 'comments_rooms_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  comments_id?: Maybe<Scalars['Float']['output']>;
  rooms_id?: Maybe<Scalars['Float']['output']>;
};

export type Comments_Aggregated = {
  __typename?: 'comments_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Comments_Aggregated_Count>;
  countDistinct?: Maybe<Comments_Aggregated_Count>;
  avg?: Maybe<Comments_Aggregated_Fields>;
  sum?: Maybe<Comments_Aggregated_Fields>;
  avgDistinct?: Maybe<Comments_Aggregated_Fields>;
  sumDistinct?: Maybe<Comments_Aggregated_Fields>;
  min?: Maybe<Comments_Aggregated_Fields>;
  max?: Maybe<Comments_Aggregated_Fields>;
};

export type Comments_Aggregated_Count = {
  __typename?: 'comments_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  day?: Maybe<Scalars['Int']['output']>;
  rooms?: Maybe<Scalars['Int']['output']>;
};

export type Comments_Aggregated_Fields = {
  __typename?: 'comments_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
};

export type Session_Types_Aggregated = {
  __typename?: 'session_types_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Session_Types_Aggregated_Count>;
  countDistinct?: Maybe<Session_Types_Aggregated_Count>;
  avg?: Maybe<Session_Types_Aggregated_Fields>;
  sum?: Maybe<Session_Types_Aggregated_Fields>;
  avgDistinct?: Maybe<Session_Types_Aggregated_Fields>;
  sumDistinct?: Maybe<Session_Types_Aggregated_Fields>;
  min?: Maybe<Session_Types_Aggregated_Fields>;
  max?: Maybe<Session_Types_Aggregated_Fields>;
};

export type Session_Types_Aggregated_Count = {
  __typename?: 'session_types_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  background_color?: Maybe<Scalars['Int']['output']>;
  text_color?: Maybe<Scalars['Int']['output']>;
  requires_referee?: Maybe<Scalars['Int']['output']>;
};

export type Session_Types_Aggregated_Fields = {
  __typename?: 'session_types_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Sessions_Aggregated = {
  __typename?: 'sessions_aggregated';
  group?: Maybe<Scalars['JSON']['output']>;
  countAll?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Sessions_Aggregated_Count>;
  countDistinct?: Maybe<Sessions_Aggregated_Count>;
  avg?: Maybe<Sessions_Aggregated_Fields>;
  sum?: Maybe<Sessions_Aggregated_Fields>;
  avgDistinct?: Maybe<Sessions_Aggregated_Fields>;
  sumDistinct?: Maybe<Sessions_Aggregated_Fields>;
  min?: Maybe<Sessions_Aggregated_Fields>;
  max?: Maybe<Sessions_Aggregated_Fields>;
};

export type Sessions_Aggregated_Count = {
  __typename?: 'sessions_aggregated_count';
  id?: Maybe<Scalars['Int']['output']>;
  user_created?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  user_updated?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['Int']['output']>;
  referee?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
  time_start?: Maybe<Scalars['Int']['output']>;
  time_end?: Maybe<Scalars['Int']['output']>;
  day?: Maybe<Scalars['Int']['output']>;
  cancelled?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['Int']['output']>;
  referee_long?: Maybe<Scalars['Int']['output']>;
  title_long?: Maybe<Scalars['Int']['output']>;
  rooms?: Maybe<Scalars['Int']['output']>;
};

export type Sessions_Aggregated_Fields = {
  __typename?: 'sessions_aggregated_fields';
  id?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_days_items: Array<Days>;
  create_days_item?: Maybe<Days>;
  create_rooms_items: Array<Rooms>;
  create_rooms_item?: Maybe<Rooms>;
  create_sessions_rooms_items: Array<Sessions_Rooms>;
  create_sessions_rooms_item?: Maybe<Sessions_Rooms>;
  create_comments_rooms_items: Array<Comments_Rooms>;
  create_comments_rooms_item?: Maybe<Comments_Rooms>;
  create_comments_items: Array<Comments>;
  create_comments_item?: Maybe<Comments>;
  create_session_types_items: Array<Session_Types>;
  create_session_types_item?: Maybe<Session_Types>;
  create_sessions_items: Array<Sessions>;
  create_sessions_item?: Maybe<Sessions>;
  update_days_items: Array<Days>;
  update_days_batch: Array<Days>;
  update_days_item?: Maybe<Days>;
  update_rooms_items: Array<Rooms>;
  update_rooms_batch: Array<Rooms>;
  update_rooms_item?: Maybe<Rooms>;
  update_sessions_rooms_items: Array<Sessions_Rooms>;
  update_sessions_rooms_batch: Array<Sessions_Rooms>;
  update_sessions_rooms_item?: Maybe<Sessions_Rooms>;
  update_comments_rooms_items: Array<Comments_Rooms>;
  update_comments_rooms_batch: Array<Comments_Rooms>;
  update_comments_rooms_item?: Maybe<Comments_Rooms>;
  update_comments_items: Array<Comments>;
  update_comments_batch: Array<Comments>;
  update_comments_item?: Maybe<Comments>;
  update_session_types_items: Array<Session_Types>;
  update_session_types_batch: Array<Session_Types>;
  update_session_types_item?: Maybe<Session_Types>;
  update_sessions_items: Array<Sessions>;
  update_sessions_batch: Array<Sessions>;
  update_sessions_item?: Maybe<Sessions>;
  delete_days_items?: Maybe<Delete_Many>;
  delete_days_item?: Maybe<Delete_One>;
  delete_rooms_items?: Maybe<Delete_Many>;
  delete_rooms_item?: Maybe<Delete_One>;
  delete_sessions_rooms_items?: Maybe<Delete_Many>;
  delete_sessions_rooms_item?: Maybe<Delete_One>;
  delete_comments_rooms_items?: Maybe<Delete_Many>;
  delete_comments_rooms_item?: Maybe<Delete_One>;
  delete_comments_items?: Maybe<Delete_Many>;
  delete_comments_item?: Maybe<Delete_One>;
  delete_session_types_items?: Maybe<Delete_Many>;
  delete_session_types_item?: Maybe<Delete_One>;
  delete_sessions_items?: Maybe<Delete_Many>;
  delete_sessions_item?: Maybe<Delete_One>;
};


export type MutationCreate_Days_ItemsArgs = {
  filter?: InputMaybe<Days_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Days_Input>>;
};


export type MutationCreate_Days_ItemArgs = {
  data: Create_Days_Input;
};


export type MutationCreate_Rooms_ItemsArgs = {
  filter?: InputMaybe<Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Rooms_Input>>;
};


export type MutationCreate_Rooms_ItemArgs = {
  data: Create_Rooms_Input;
};


export type MutationCreate_Sessions_Rooms_ItemsArgs = {
  filter?: InputMaybe<Sessions_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Sessions_Rooms_Input>>;
};


export type MutationCreate_Sessions_Rooms_ItemArgs = {
  data: Create_Sessions_Rooms_Input;
};


export type MutationCreate_Comments_Rooms_ItemsArgs = {
  filter?: InputMaybe<Comments_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Comments_Rooms_Input>>;
};


export type MutationCreate_Comments_Rooms_ItemArgs = {
  data: Create_Comments_Rooms_Input;
};


export type MutationCreate_Comments_ItemsArgs = {
  filter?: InputMaybe<Comments_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Comments_Input>>;
};


export type MutationCreate_Comments_ItemArgs = {
  data: Create_Comments_Input;
};


export type MutationCreate_Session_Types_ItemsArgs = {
  filter?: InputMaybe<Session_Types_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Session_Types_Input>>;
};


export type MutationCreate_Session_Types_ItemArgs = {
  data: Create_Session_Types_Input;
};


export type MutationCreate_Sessions_ItemsArgs = {
  filter?: InputMaybe<Sessions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Create_Sessions_Input>>;
};


export type MutationCreate_Sessions_ItemArgs = {
  data: Create_Sessions_Input;
};


export type MutationUpdate_Days_ItemsArgs = {
  filter?: InputMaybe<Days_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Days_Input;
};


export type MutationUpdate_Days_BatchArgs = {
  filter?: InputMaybe<Days_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Days_Input>>;
};


export type MutationUpdate_Days_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Days_Input;
};


export type MutationUpdate_Rooms_ItemsArgs = {
  filter?: InputMaybe<Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Rooms_Input;
};


export type MutationUpdate_Rooms_BatchArgs = {
  filter?: InputMaybe<Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Rooms_Input>>;
};


export type MutationUpdate_Rooms_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Rooms_Input;
};


export type MutationUpdate_Sessions_Rooms_ItemsArgs = {
  filter?: InputMaybe<Sessions_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Sessions_Rooms_Input;
};


export type MutationUpdate_Sessions_Rooms_BatchArgs = {
  filter?: InputMaybe<Sessions_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Sessions_Rooms_Input>>;
};


export type MutationUpdate_Sessions_Rooms_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Sessions_Rooms_Input;
};


export type MutationUpdate_Comments_Rooms_ItemsArgs = {
  filter?: InputMaybe<Comments_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Comments_Rooms_Input;
};


export type MutationUpdate_Comments_Rooms_BatchArgs = {
  filter?: InputMaybe<Comments_Rooms_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Comments_Rooms_Input>>;
};


export type MutationUpdate_Comments_Rooms_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Comments_Rooms_Input;
};


export type MutationUpdate_Comments_ItemsArgs = {
  filter?: InputMaybe<Comments_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Comments_Input;
};


export type MutationUpdate_Comments_BatchArgs = {
  filter?: InputMaybe<Comments_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Comments_Input>>;
};


export type MutationUpdate_Comments_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Comments_Input;
};


export type MutationUpdate_Session_Types_ItemsArgs = {
  filter?: InputMaybe<Session_Types_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Session_Types_Input;
};


export type MutationUpdate_Session_Types_BatchArgs = {
  filter?: InputMaybe<Session_Types_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Session_Types_Input>>;
};


export type MutationUpdate_Session_Types_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Session_Types_Input;
};


export type MutationUpdate_Sessions_ItemsArgs = {
  filter?: InputMaybe<Sessions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  data: Update_Sessions_Input;
};


export type MutationUpdate_Sessions_BatchArgs = {
  filter?: InputMaybe<Sessions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<Update_Sessions_Input>>;
};


export type MutationUpdate_Sessions_ItemArgs = {
  id: Scalars['ID']['input'];
  data: Update_Sessions_Input;
};


export type MutationDelete_Days_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Days_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Rooms_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Rooms_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sessions_Rooms_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sessions_Rooms_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Comments_Rooms_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Comments_Rooms_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Comments_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Comments_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Session_Types_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Session_Types_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDelete_Sessions_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDelete_Sessions_ItemArgs = {
  id: Scalars['ID']['input'];
};

export type Create_Days_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<Create_Sessions_Input>>>;
  comments?: InputMaybe<Array<InputMaybe<Create_Comments_Input>>>;
};

export type Create_Sessions_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  referee?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Create_Session_Types_Input>;
  time_start?: InputMaybe<Scalars['String']['input']>;
  time_end?: InputMaybe<Scalars['String']['input']>;
  day?: InputMaybe<Create_Days_Input>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  referee_long?: InputMaybe<Scalars['String']['input']>;
  title_long?: InputMaybe<Scalars['String']['input']>;
  rooms?: InputMaybe<Array<InputMaybe<Create_Sessions_Rooms_Input>>>;
};

export type Create_Directus_Users_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['Hash']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  language?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  tfa_secret?: InputMaybe<Scalars['Hash']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  token?: InputMaybe<Scalars['Hash']['input']>;
  last_access?: InputMaybe<Scalars['Date']['input']>;
  last_page?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  external_identifier?: InputMaybe<Scalars['String']['input']>;
  auth_data?: InputMaybe<Scalars['JSON']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Create_Directus_Files_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  storage: Scalars['String']['input'];
  filename_disk?: InputMaybe<Scalars['String']['input']>;
  filename_download: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']['input']>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']['input']>;
  charset?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  embed?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Roles_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  enforce_tfa: Scalars['Boolean']['input'];
  admin_access: Scalars['Boolean']['input'];
  app_access?: InputMaybe<Scalars['Boolean']['input']>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
};

export type Create_Session_Types_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  background_color?: InputMaybe<Scalars['String']['input']>;
  text_color?: InputMaybe<Scalars['String']['input']>;
  requires_referee?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Create_Sessions_Rooms_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sessions_id?: InputMaybe<Create_Sessions_Input>;
  rooms_id?: InputMaybe<Create_Rooms_Input>;
};

export type Create_Rooms_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Create_Comments_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  day?: InputMaybe<Create_Days_Input>;
  rooms?: InputMaybe<Array<InputMaybe<Create_Comments_Rooms_Input>>>;
};

export type Create_Comments_Rooms_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  comments_id?: InputMaybe<Create_Comments_Input>;
  rooms_id?: InputMaybe<Create_Rooms_Input>;
};

export type Update_Days_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<Update_Sessions_Input>>>;
  comments?: InputMaybe<Array<InputMaybe<Update_Comments_Input>>>;
};

export type Update_Sessions_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  referee?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Update_Session_Types_Input>;
  time_start?: InputMaybe<Scalars['String']['input']>;
  time_end?: InputMaybe<Scalars['String']['input']>;
  day?: InputMaybe<Update_Days_Input>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  referee_long?: InputMaybe<Scalars['String']['input']>;
  title_long?: InputMaybe<Scalars['String']['input']>;
  rooms?: InputMaybe<Array<InputMaybe<Update_Sessions_Rooms_Input>>>;
};

export type Update_Directus_Users_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['Hash']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  language?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  tfa_secret?: InputMaybe<Scalars['Hash']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  token?: InputMaybe<Scalars['Hash']['input']>;
  last_access?: InputMaybe<Scalars['Date']['input']>;
  last_page?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  external_identifier?: InputMaybe<Scalars['String']['input']>;
  auth_data?: InputMaybe<Scalars['JSON']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Update_Directus_Files_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  storage?: InputMaybe<Scalars['String']['input']>;
  filename_disk?: InputMaybe<Scalars['String']['input']>;
  filename_download?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']['input']>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']['input']>;
  charset?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  embed?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Roles_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  enforce_tfa?: InputMaybe<Scalars['Boolean']['input']>;
  admin_access?: InputMaybe<Scalars['Boolean']['input']>;
  app_access?: InputMaybe<Scalars['Boolean']['input']>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
};

export type Update_Session_Types_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  background_color?: InputMaybe<Scalars['String']['input']>;
  text_color?: InputMaybe<Scalars['String']['input']>;
  requires_referee?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Update_Sessions_Rooms_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sessions_id?: InputMaybe<Update_Sessions_Input>;
  rooms_id?: InputMaybe<Update_Rooms_Input>;
};

export type Update_Rooms_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Comments_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  date_created?: InputMaybe<Scalars['Date']['input']>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
  date_updated?: InputMaybe<Scalars['Date']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  day?: InputMaybe<Update_Days_Input>;
  rooms?: InputMaybe<Array<InputMaybe<Update_Comments_Rooms_Input>>>;
};

export type Update_Comments_Rooms_Input = {
  id?: InputMaybe<Scalars['ID']['input']>;
  comments_id?: InputMaybe<Update_Comments_Input>;
  rooms_id?: InputMaybe<Update_Rooms_Input>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']['output']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  directus_folders_mutated?: Maybe<Directus_Folders_Mutated>;
  directus_revisions_mutated?: Maybe<Directus_Revisions_Mutated>;
  directus_dashboards_mutated?: Maybe<Directus_Dashboards_Mutated>;
  directus_files_mutated?: Maybe<Directus_Files_Mutated>;
  directus_permissions_mutated?: Maybe<Directus_Permissions_Mutated>;
  directus_webhooks_mutated?: Maybe<Directus_Webhooks_Mutated>;
  directus_roles_mutated?: Maybe<Directus_Roles_Mutated>;
  directus_users_mutated?: Maybe<Directus_Users_Mutated>;
  directus_panels_mutated?: Maybe<Directus_Panels_Mutated>;
  directus_flows_mutated?: Maybe<Directus_Flows_Mutated>;
  directus_operations_mutated?: Maybe<Directus_Operations_Mutated>;
  directus_activity_mutated?: Maybe<Directus_Activity_Mutated>;
  directus_notifications_mutated?: Maybe<Directus_Notifications_Mutated>;
  directus_presets_mutated?: Maybe<Directus_Presets_Mutated>;
  directus_translations_mutated?: Maybe<Directus_Translations_Mutated>;
  directus_settings_mutated?: Maybe<Directus_Settings_Mutated>;
  directus_shares_mutated?: Maybe<Directus_Shares_Mutated>;
  days_mutated?: Maybe<Days_Mutated>;
  rooms_mutated?: Maybe<Rooms_Mutated>;
  sessions_rooms_mutated?: Maybe<Sessions_Rooms_Mutated>;
  comments_rooms_mutated?: Maybe<Comments_Rooms_Mutated>;
  comments_mutated?: Maybe<Comments_Mutated>;
  session_types_mutated?: Maybe<Session_Types_Mutated>;
  sessions_mutated?: Maybe<Sessions_Mutated>;
};


export type SubscriptionDirectus_Folders_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Revisions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Dashboards_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Files_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Permissions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Webhooks_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Roles_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Users_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Panels_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Flows_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Operations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Activity_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Notifications_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Presets_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Settings_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDirectus_Shares_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionDays_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionRooms_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSessions_Rooms_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionComments_Rooms_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionComments_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSession_Types_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionSessions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type Directus_Folders_Mutated = {
  __typename?: 'directus_folders_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Folders>;
};

export enum EventEnum {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

export type Directus_Revisions_Mutated = {
  __typename?: 'directus_revisions_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Revisions>;
};

export type Directus_Revisions = {
  __typename?: 'directus_revisions';
  id: Scalars['ID']['output'];
  activity?: Maybe<Directus_Activity>;
  collection: Scalars['String']['output'];
  item: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  data_func?: Maybe<Count_Functions>;
  delta?: Maybe<Scalars['JSON']['output']>;
  delta_func?: Maybe<Count_Functions>;
  parent?: Maybe<Directus_Revisions>;
};


export type Directus_RevisionsActivityArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_RevisionsParentArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Activity = {
  __typename?: 'directus_activity';
  id: Scalars['ID']['output'];
  action: Scalars['String']['output'];
  user?: Maybe<Directus_Users>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  timestamp_func?: Maybe<Datetime_Functions>;
  ip?: Maybe<Scalars['String']['output']>;
  user_agent?: Maybe<Scalars['String']['output']>;
  collection: Scalars['String']['output'];
  item: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Scalars['String']['output']>;
  revisions?: Maybe<Array<Maybe<Directus_Revisions>>>;
  revisions_func?: Maybe<Count_Functions>;
};


export type Directus_ActivityUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_ActivityRevisionsArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Revisions_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
};

export type Directus_Activity_Filter = {
  id?: InputMaybe<Number_Filter_Operators>;
  action?: InputMaybe<String_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
  timestamp?: InputMaybe<Date_Filter_Operators>;
  timestamp_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  ip?: InputMaybe<String_Filter_Operators>;
  user_agent?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  comment?: InputMaybe<String_Filter_Operators>;
  origin?: InputMaybe<String_Filter_Operators>;
  revisions?: InputMaybe<Directus_Revisions_Filter>;
  revisions_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
};

export type Directus_Dashboards_Mutated = {
  __typename?: 'directus_dashboards_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Dashboards>;
};

export type Directus_Dashboards = {
  __typename?: 'directus_dashboards';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  user_created?: Maybe<Directus_Users>;
  color?: Maybe<Scalars['String']['output']>;
  panels?: Maybe<Array<Maybe<Directus_Panels>>>;
  panels_func?: Maybe<Count_Functions>;
};


export type Directus_DashboardsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_DashboardsPanelsArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Panels = {
  __typename?: 'directus_panels';
  id: Scalars['ID']['output'];
  dashboard?: Maybe<Directus_Dashboards>;
  name?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  show_header: Scalars['Boolean']['output'];
  note?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  position_x: Scalars['Int']['output'];
  position_y: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  options?: Maybe<Scalars['JSON']['output']>;
  options_func?: Maybe<Count_Functions>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_PanelsDashboardArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_PanelsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Dashboards_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  color?: InputMaybe<String_Filter_Operators>;
  panels?: InputMaybe<Directus_Panels_Filter>;
  panels_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
};

export type Directus_Panels_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  name?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
};

export type Directus_Files_Mutated = {
  __typename?: 'directus_files_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Files>;
};

export type Directus_Permissions_Mutated = {
  __typename?: 'directus_permissions_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Permissions>;
};

export type Directus_Permissions = {
  __typename?: 'directus_permissions';
  id: Scalars['ID']['output'];
  role?: Maybe<Directus_Roles>;
  collection: Scalars['String']['output'];
  action: Scalars['String']['output'];
  permissions?: Maybe<Scalars['JSON']['output']>;
  permissions_func?: Maybe<Count_Functions>;
  validation?: Maybe<Scalars['JSON']['output']>;
  validation_func?: Maybe<Count_Functions>;
  presets?: Maybe<Scalars['JSON']['output']>;
  presets_func?: Maybe<Count_Functions>;
  fields?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


export type Directus_PermissionsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Webhooks_Mutated = {
  __typename?: 'directus_webhooks_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Webhooks>;
};

export type Directus_Webhooks = {
  __typename?: 'directus_webhooks';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  method?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['Boolean']['output']>;
  actions: Array<Maybe<Scalars['String']['output']>>;
  collections: Array<Maybe<Scalars['String']['output']>>;
  headers?: Maybe<Scalars['JSON']['output']>;
  headers_func?: Maybe<Count_Functions>;
};

export type Directus_Roles_Mutated = {
  __typename?: 'directus_roles_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Roles>;
};

export type Directus_Users_Mutated = {
  __typename?: 'directus_users_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Users>;
};

export type Directus_Panels_Mutated = {
  __typename?: 'directus_panels_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Panels>;
};

export type Directus_Flows_Mutated = {
  __typename?: 'directus_flows_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Flows>;
};

export type Directus_Flows = {
  __typename?: 'directus_flows';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  trigger?: Maybe<Scalars['String']['output']>;
  accountability?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Scalars['JSON']['output']>;
  options_func?: Maybe<Count_Functions>;
  operation?: Maybe<Directus_Operations>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  user_created?: Maybe<Directus_Users>;
  operations?: Maybe<Array<Maybe<Directus_Operations>>>;
  operations_func?: Maybe<Count_Functions>;
};


export type Directus_FlowsOperationArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_FlowsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_FlowsOperationsArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Operations = {
  __typename?: 'directus_operations';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  type: Scalars['String']['output'];
  position_x: Scalars['Int']['output'];
  position_y: Scalars['Int']['output'];
  options?: Maybe<Scalars['JSON']['output']>;
  options_func?: Maybe<Count_Functions>;
  resolve?: Maybe<Directus_Operations>;
  reject?: Maybe<Directus_Operations>;
  flow?: Maybe<Directus_Flows>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  user_created?: Maybe<Directus_Users>;
};


export type Directus_OperationsResolveArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_OperationsRejectArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_OperationsFlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_OperationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Operations_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
};

export type Directus_Flows_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  trigger?: InputMaybe<String_Filter_Operators>;
  accountability?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  operation?: InputMaybe<Directus_Operations_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  operations?: InputMaybe<Directus_Operations_Filter>;
  operations_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
};

export type Directus_Operations_Mutated = {
  __typename?: 'directus_operations_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Operations>;
};

export type Directus_Activity_Mutated = {
  __typename?: 'directus_activity_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Activity>;
};

export type Directus_Notifications_Mutated = {
  __typename?: 'directus_notifications_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Notifications>;
};

export type Directus_Notifications = {
  __typename?: 'directus_notifications';
  id: Scalars['ID']['output'];
  timestamp?: Maybe<Scalars['Date']['output']>;
  timestamp_func?: Maybe<Datetime_Functions>;
  status?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Directus_Users>;
  sender?: Maybe<Directus_Users>;
  subject: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<Scalars['String']['output']>;
  item?: Maybe<Scalars['String']['output']>;
};


export type Directus_NotificationsRecipientArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_NotificationsSenderArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Presets_Mutated = {
  __typename?: 'directus_presets_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Presets>;
};

export type Directus_Presets = {
  __typename?: 'directus_presets';
  id: Scalars['ID']['output'];
  bookmark?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Directus_Users>;
  role?: Maybe<Directus_Roles>;
  collection?: Maybe<Scalars['String']['output']>;
  search?: Maybe<Scalars['String']['output']>;
  layout?: Maybe<Scalars['String']['output']>;
  layout_query?: Maybe<Scalars['JSON']['output']>;
  layout_query_func?: Maybe<Count_Functions>;
  layout_options?: Maybe<Scalars['JSON']['output']>;
  layout_options_func?: Maybe<Count_Functions>;
  refresh_interval?: Maybe<Scalars['Int']['output']>;
  filter?: Maybe<Scalars['JSON']['output']>;
  filter_func?: Maybe<Count_Functions>;
  icon?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
};


export type Directus_PresetsUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_PresetsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Translations_Mutated = {
  __typename?: 'directus_translations_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Translations>;
};

export type Directus_Translations = {
  __typename?: 'directus_translations';
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Directus_Settings_Mutated = {
  __typename?: 'directus_settings_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Settings>;
};

export type Directus_Settings = {
  __typename?: 'directus_settings';
  id: Scalars['ID']['output'];
  project_name?: Maybe<Scalars['String']['output']>;
  project_url?: Maybe<Scalars['String']['output']>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: Maybe<Scalars['String']['output']>;
  project_logo?: Maybe<Directus_Files>;
  public_foreground?: Maybe<Directus_Files>;
  public_background?: Maybe<Directus_Files>;
  public_note?: Maybe<Scalars['String']['output']>;
  auth_login_attempts?: Maybe<Scalars['Int']['output']>;
  auth_password_policy?: Maybe<Scalars['String']['output']>;
  storage_asset_transform?: Maybe<Scalars['String']['output']>;
  storage_asset_presets?: Maybe<Scalars['JSON']['output']>;
  storage_asset_presets_func?: Maybe<Count_Functions>;
  custom_css?: Maybe<Scalars['String']['output']>;
  storage_default_folder?: Maybe<Directus_Folders>;
  basemaps?: Maybe<Scalars['JSON']['output']>;
  basemaps_func?: Maybe<Count_Functions>;
  mapbox_key?: Maybe<Scalars['String']['output']>;
  module_bar?: Maybe<Scalars['JSON']['output']>;
  module_bar_func?: Maybe<Count_Functions>;
  project_descriptor?: Maybe<Scalars['String']['output']>;
  default_language?: Maybe<Scalars['String']['output']>;
  custom_aspect_ratios?: Maybe<Scalars['JSON']['output']>;
  custom_aspect_ratios_func?: Maybe<Count_Functions>;
};


export type Directus_SettingsProject_LogoArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_SettingsPublic_ForegroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_SettingsPublic_BackgroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_SettingsStorage_Default_FolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Directus_Shares_Mutated = {
  __typename?: 'directus_shares_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Directus_Shares>;
};

export type Directus_Shares = {
  __typename?: 'directus_shares';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  collection: Scalars['String']['output'];
  item: Scalars['String']['output'];
  role?: Maybe<Directus_Roles>;
  /** $t:shared_leave_blank_for_passwordless_access */
  password?: Maybe<Scalars['Hash']['output']>;
  user_created?: Maybe<Directus_Users>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars['Date']['output']>;
  date_start_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars['Date']['output']>;
  date_end_func?: Maybe<Datetime_Functions>;
  times_used?: Maybe<Scalars['Int']['output']>;
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars['Int']['output']>;
};


export type Directus_SharesRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type Directus_SharesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Days_Mutated = {
  __typename?: 'days_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Days>;
};

export type Rooms_Mutated = {
  __typename?: 'rooms_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Rooms>;
};

export type Sessions_Rooms_Mutated = {
  __typename?: 'sessions_rooms_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Sessions_Rooms>;
};

export type Comments_Rooms_Mutated = {
  __typename?: 'comments_rooms_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Comments_Rooms>;
};

export type Comments_Mutated = {
  __typename?: 'comments_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Comments>;
};

export type Session_Types_Mutated = {
  __typename?: 'session_types_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Session_Types>;
};

export type Sessions_Mutated = {
  __typename?: 'sessions_mutated';
  key: Scalars['ID']['output'];
  event?: Maybe<EventEnum>;
  data?: Maybe<Sessions>;
};

export type GetSessionsGroupedByDayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionsGroupedByDayQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'rooms', id: string, name?: string | null }>, days: Array<{ __typename?: 'days', id: string, display?: string | null, date?: any | null, sessions?: Array<{ __typename?: 'sessions', id: string, title?: string | null, referee?: string | null, cancelled?: boolean | null, time_start?: string | null, time_end?: string | null, type?: { __typename?: 'session_types', name?: string | null, requires_referee?: boolean | null, background_color?: string | null, text_color?: string | null } | null, rooms?: Array<{ __typename?: 'sessions_rooms', rooms_id?: { __typename?: 'rooms', id: string, name?: string | null } | null } | null> | null } | null> | null, comments?: Array<{ __typename?: 'comments', id: string, content?: string | null, time?: string | null, rooms?: Array<{ __typename?: 'comments_rooms', rooms_id?: { __typename?: 'rooms', id: string } | null } | null> | null } | null> | null }> };

export type GetSessionByIdQueryVariables = Exact<{
  sessionId: Scalars['ID']['input'];
}>;


export type GetSessionByIdQuery = { __typename?: 'Query', sessions_by_id?: { __typename?: 'sessions', id: string, title?: string | null, title_long?: string | null, referee?: string | null, referee_long?: string | null, description?: string | null, cancelled?: boolean | null, time_start?: string | null, time_end?: string | null, type?: { __typename?: 'session_types', name?: string | null } | null, day?: { __typename?: 'days', display?: string | null, date?: any | null } | null, rooms?: Array<{ __typename?: 'sessions_rooms', rooms_id?: { __typename?: 'rooms', name?: string | null } | null } | null> | null } | null };


export const GetSessionsGroupedByDayDocument = `
    query GetSessionsGroupedByDay {
  rooms {
    id
    name
  }
  days {
    id
    display
    date
    sessions(sort: ["time_start"]) {
      id
      title
      referee
      type {
        name
        requires_referee
        background_color
        text_color
      }
      cancelled
      time_start
      time_end
      rooms {
        rooms_id {
          id
          name
        }
      }
    }
    comments(sort: ["time"]) {
      id
      content
      time
      rooms {
        rooms_id {
          id
        }
      }
    }
  }
}
    `;
export const useGetSessionsGroupedByDayQuery = <
      TData = GetSessionsGroupedByDayQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetSessionsGroupedByDayQueryVariables,
      options?: UseQueryOptions<GetSessionsGroupedByDayQuery, TError, TData>
    ) =>
    useQuery<GetSessionsGroupedByDayQuery, TError, TData>(
      variables === undefined ? ['GetSessionsGroupedByDay'] : ['GetSessionsGroupedByDay', variables],
      fetcher<GetSessionsGroupedByDayQuery, GetSessionsGroupedByDayQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSessionsGroupedByDayDocument, variables),
      options
    );
export const GetSessionByIdDocument = `
    query GetSessionById($sessionId: ID!) {
  sessions_by_id(id: $sessionId) {
    id
    title
    title_long
    referee
    referee_long
    description
    type {
      name
    }
    cancelled
    day {
      display
      date
    }
    time_start
    time_end
    rooms {
      rooms_id {
        name
      }
    }
  }
}
    `;
export const useGetSessionByIdQuery = <
      TData = GetSessionByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSessionByIdQueryVariables,
      options?: UseQueryOptions<GetSessionByIdQuery, TError, TData>
    ) =>
    useQuery<GetSessionByIdQuery, TError, TData>(
      ['GetSessionById', variables],
      fetcher<GetSessionByIdQuery, GetSessionByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSessionByIdDocument, variables),
      options
    );