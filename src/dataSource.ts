import { useQuery } from "@tanstack/react-query";
import { useUser } from "./appContext";

export const baseUrl = "https://akademie-app.soeftware.de/api/v1";

export type Wiki = {
  id: number;
  name: string;
  url: string;
}[];

export const useWiki = () =>
  useQuery({
    queryKey: ["wiki"],
    queryFn: (): Promise<Wiki> =>
      fetch(baseUrl + "/documents")
        .then((r) => r.json())
        .then((data: { name: string; url: string }[]) =>
          data.map((a, i) => ({ id: i, ...a })),
        ),
  });

export type SessionPreview = Omit<SessionDetails, "description">;

type DateOnly = string;
type TimeOnly = string;

export type Schedule = {
  days: {
    name: string;
    date: DateOnly;
    columns: {
      title: string;
    }[];
  }[];
  timeStart: TimeOnly;
  timeEnd: TimeOnly;
  sessions: {
    id: number;
    title: string;
    subtitle: string | null;
    cancelled: boolean;
    timeStart: string;
    timeEnd: string;
    textColor: string;
    backgroundColor: string;
    border: boolean;
    day: number;
    columnStart: number;
    columnEnd: number;
    sessionId: number | null;
    subscribed?: boolean;
  }[];
};

export const useSchedule = () =>
  useQuery({
    queryKey: ["schedule"],
    queryFn: (): Promise<Schedule> =>
      fetch(baseUrl + "/schedule").then((r) => r.json()),
  });

export type SessionDetails = {
  id: number;
  title: string;
  abstractDescription: string;
  speaker: string;
  speakerCV: string;
  sessionType: string;
  startTime: string;
  endTime: string;
  location: string;
  changeFlag: "None" | "Added" | "Moved" | "Cancelled";
  extraData: { label: string; value: string }[];
};

export const useSessionDetails = (id: number) =>
  useQuery({
    queryKey: ["session", id],
    queryFn: (): Promise<SessionDetails> =>
      fetch(baseUrl + "/sessions/" + id).then((r) => r.json()),
  });

export type Profile = {
  name: string;
  extraData: { label: string; value: string }[];
};

export const useProfile = () => {
  const token = useUser()?.token;

  return useQuery({
    queryKey: [token, "profile"],
    enabled: !!token,
    queryFn: (): Promise<Profile> =>
      fetch(baseUrl + "/profile", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }).then((r) => r.json()),
  });
};
