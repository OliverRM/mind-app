import { useQuery } from "@tanstack/react-query";

const baseUrl = "https://924505b8-69cb-40ba-9618-72c7eed64d1f.mock.pstmn.io/";

type Schedule = {
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
  }[];
};

export const useSchedule = () =>
  useQuery({
    queryKey: ["schedule"],
    queryFn: (): Promise<Schedule> =>
      fetch(baseUrl + "/schedule").then((r) => r.json()),
  });

type Profile = {
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
