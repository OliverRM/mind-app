import { useQuery } from "@tanstack/react-query";

export const baseUrl = "https://mind-rp.oliverrm.de/api/v1";

export type Wiki = {
  articles: {
    id: string;
    title: string;
    subtitle: string;
  }[];
};

export const useWiki = () =>
  useQuery({
    queryKey: ["wiki"],
    queryFn: (): Promise<Wiki> =>
      fetch(baseUrl + "/wiki").then((r) => r.json()),
  });

export type WikiArticle = {
  id: string;
  title: string;
  content: string;
};

export const useWikiArticle = (id: string) =>
  useQuery({
    queryKey: ["wiki", id],
    queryFn: (): Promise<WikiArticle> =>
      fetch(baseUrl + "/wiki/article/" + id).then((r) => r.json()),
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
  id: string;
  title: string;
  referee: string | null;
  type: string;
  cancelled: boolean;
  location: string;
  day: string;
  timeStart: string;
  timeEnd: string;
  description: string;
};

export const useSessionDetails = (id: number) =>
  useQuery({
    queryKey: ["session", id],
    queryFn: (): Promise<SessionDetails> =>
      fetch(baseUrl + "/sessions/" + id).then((r) => r.json()),
  });

export type Profile = {
  name: string;
  subtitle: string;
  paymentStatus: "PAYED" | "PENDING";
  extraData: { label: string; value: string }[];
};

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: (): Promise<Profile> =>
      fetch(baseUrl + "/profile").then((r) => r.json()),
  });
