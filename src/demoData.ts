import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import sessions from "./sessions.json";

const session_types = {
  1: {
    name: "Mahlzeit",
    background_color: "#B4B4B4",
    foreground_color: "#FFFFFF",
  },
  2: {
    name: "Vortrag",
    background_color: "#FFFFFF",
    foreground_color: "#000000",
  },
  3: {
    name: "Workshop",
    background_color: "#FCCFAA",
    foreground_color: "#000000",
  },
  4: {
    name: "Rahmenprogramm",
    background_color: "#FCCFAA",
    foreground_color: "#000000",
  },
};
const rooms = [
  { id: "1", name: "Carl Benz" },
  { id: "2", name: "Berta Benz" },
  { id: "3", name: "Toulon (A030)" },
  { id: "4", name: "Windsor (A309)" },
  { id: "5", name: "Schiller (C301)" },
];

export type GetSessionsGroupedByDayQuery = {
  __typename?: "Query";
  rooms: Array<{ __typename?: "rooms"; id: string; name?: string | null }>;
  days: Array<{
    __typename?: "days";
    id: string;
    display?: string | null;
    date?: any | null;
    sessions?: Array<{
      __typename?: "sessions";
      id: string;
      title?: string | null;
      referee?: string | null;
      cancelled?: boolean | null;
      time_start?: string | null;
      time_end?: string | null;
      type?: {
        __typename?: "session_types";
        name?: string | null;
        requires_referee?: boolean | null;
        background_color?: string | null;
        text_color?: string | null;
      } | null;
      rooms?: Array<{
        __typename?: "sessions_rooms";
        rooms_id?: {
          __typename?: "rooms";
          id: string;
          name?: string | null;
        } | null;
      } | null> | null;
    } | null> | null;
    comments?: Array<{
      __typename?: "comments";
      id: string;
      content?: string | null;
      time?: string | null;
      rooms?: Array<{
        __typename?: "comments_rooms";
        rooms_id?: { __typename?: "rooms"; id: string } | null;
      } | null> | null;
    } | null> | null;
  }>;
};

type Session = Exclude<
  Exclude<
    GetSessionsGroupedByDayQuery["days"][number]["sessions"],
    null | undefined
  >[number],
  null
>;

const getSessions = (day: number) =>
  sessions
    .filter((s) => s.day.id === day)
    .filter((s) => s.rooms)
    .map(
      (s, i): Session => ({
        ...s,
        id: i.toString(),
        type: s.type
          ? session_types[s.type.id as keyof typeof session_types]
          : session_types[4],
        rooms:
          s.rooms?.map(({ rooms_id: { id } }) => ({
            rooms_id: rooms.find((r) => r.id === id.toString()),
          })) ?? rooms.map((r) => ({ rooms_id: r })),
      }),
    );
export const useGetSessionsGroupedByDayQuery = <
  TData = GetSessionsGroupedByDayQuery,
  TError = unknown,
>(
  _dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: {},
  options?: UseQueryOptions<GetSessionsGroupedByDayQuery, TError, TData>,
) =>
  useQuery<GetSessionsGroupedByDayQuery, TError, TData>(
    variables === undefined
      ? ["GetSessionsGroupedByDay"]
      : ["GetSessionsGroupedByDay", variables],
    () => ({
      rooms,
      days: [
        {
          id: "1",
          display: "Samstag",
          date: "2023-09-30",
          sessions: getSessions(1),
          comments: [
            {
              id: "1",
              content: "Check-In ab 12:00",
              time: "12:00",
              rooms: rooms.map((r) => ({ rooms_id: r })),
            },
            {
              id: "2",
              content: "Zimmerbezug ab 14:00",
              time: "14:00",
              rooms: rooms.map((r) => ({ rooms_id: r })),
            },
          ],
        },
        {
          id: "2",
          display: "Sonntag",
          date: "2023-10-01",
          sessions: getSessions(2),
          comments: [],
        },
        {
          id: "3",
          display: "Montag",
          date: "2023-10-02",
          sessions: getSessions(3),
          comments: [],
        },
        {
          id: "4",
          display: "Dienstag",
          date: "2023-10-03",
          sessions: getSessions(4),
          comments: [
            {
              id: "3",
              content: "Check-Out bis 10:00",
              time: "10:00",
              rooms: rooms
                .filter((r) => ["4", "5"].includes(r.id))
                .map((r) => ({ rooms_id: r })),
            },
          ],
        },
      ],
    }),
    options,
  );

export type GetSessionByIdQuery = {
  __typename?: "Query";
  sessions_by_id?: {
    __typename?: "sessions";
    id: string;
    title?: string | null;
    title_long?: string | null;
    referee?: string | null;
    referee_long?: string | null;
    description?: string | null;
    cancelled?: boolean | null;
    time_start?: string | null;
    time_end?: string | null;
    type?: { __typename?: "session_types"; name?: string | null } | null;
    day?: {
      __typename?: "days";
      display?: string | null;
      date?: any | null;
    } | null;
    rooms?: Array<{
      __typename?: "sessions_rooms";
      rooms_id?: { __typename?: "rooms"; name?: string | null } | null;
    } | null> | null;
  } | null;
};

export const useGetSessionByIdQuery = <
  TData = GetSessionByIdQuery,
  TError = unknown,
>(
  _dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: { sessionId: string },
  options?: UseQueryOptions<GetSessionByIdQuery, TError, TData>,
) =>
  useQuery<GetSessionByIdQuery, TError, TData>(
    ["GetSessionById", variables],
    () => ({
      sessions_by_id: {
        id: variables.sessionId,
        title: "App-Entwickung",
        title_long:
          "Vom der Idee zum Erfolg: Wie moderne App-Entwicklung funktioniert",
        referee: "Mayer",
        referee_long: "Oliver Mayer",
        description: "Bla, bla, bla...",
        cancelled: false,
        time_start: "8:00",
        time_end: "9:30",
        type: { name: "lecture" },
        day: {
          display: "Freitag",
          date: "2024-05-31",
        },
        rooms: [{ rooms_id: { name: "Berta Benz" } }],
      },
    }),
    options,
  );
