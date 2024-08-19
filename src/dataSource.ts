import { useQuery } from "@tanstack/react-query";

const baseUrl = "https://924505b8-69cb-40ba-9618-72c7eed64d1f.mock.pstmn.io/";

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

export type Schedule = {
  days: {
    name: string;
    date: string;
    columns: {
      title: string;
    }[];
  }[];
  timeStart: string;
  timeEnd: string;
  sessions: {
    id: string;
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
    session: SessionPreview | null;
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

export const useSessionDetails = (id: string) =>
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
