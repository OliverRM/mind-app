import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetUser, useUser } from "./appContext";
import { queryClient } from "./query";

export const baseUrl = "https://akademie-app.mind-hochschul-netzwerk.de/api/v1";

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
    textColorHighlighted?: string;
    backgroundColorHighlighted?: string;
    border: boolean;
    day: number;
    columnStart: number;
    columnEnd: number;
    sessionId: number | null;
    subscribed?: boolean;
  }[];
};

export const useSchedule = () => {
  const token = useUser()?.token;

  return useQuery({
    queryKey: ["schedule"],
    queryFn: (): Promise<Schedule> =>
      fetch(baseUrl + "/schedule", {
        headers: token
          ? new Headers({ Authorization: "Bearer " + token })
          : undefined,
      }).then((r) => r.json()),
  });
};

export type SessionDetails = {
  id: number;
  title: string;
  abstractDescription: string | null;
  speaker: string | null;
  speakerCV: string | null;
  sessionType: string;
  startTime: string;
  endTime: string;
  location: string | null;
  changeFlag: "None" | "Added" | "Moved" | "Cancelled";
  bookable?: boolean;
  subscribed?: boolean;
  feedback?:
    | {
        question: string;
        type: string;
        min: number | null;
        max: number | null;
        labels?: string[] | null;
        answer: unknown;
      }[]
    | null;
  extraData: { label: string; value: string }[];
};

export const useSessionDetails = (id: number) => {
  const token = useUser()?.token;

  return useQuery({
    queryKey: ["session", id],
    queryFn: (): Promise<SessionDetails> =>
      fetch(baseUrl + "/sessions/" + id, {
        headers: token
          ? new Headers({ Authorization: "Bearer " + token })
          : undefined,
      }).then((r) => r.json()),
  });
};

export const useBookSession = (id: number) => {
  const token = useUser()?.token;
  const setUser = useSetUser();

  return useMutation({
    mutationKey: ["book", id],
    mutationFn: (book: boolean) =>
      fetch(baseUrl + "/sessions/" + id + "/book", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
        body: book.toString(),
      }).then((r) => {
        if (r.status === 401) setUser(null);
        if (!r.ok) throw new Error(r.statusText);
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      queryClient.cancelQueries({ queryKey: ["session", id] });
      queryClient.setQueryData(["session", id], (old: SessionDetails) => ({
        ...old,
        bookable: false,
      }));
      queryClient.invalidateQueries({ queryKey: ["session", id] });
    },
  });
};

export const useSubscribeSession = (id: number) => {
  const token = useUser()?.token;
  const setUser = useSetUser();

  return useMutation({
    mutationKey: ["subscribe", id],
    mutationFn: (subscribed: boolean) =>
      fetch(baseUrl + "/sessions/" + id + "/subscribed", {
        method: "PUT",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
        body: subscribed.toString(),
      }).then((r) => {
        if (r.status === 401) setUser(null);
        if (!r.ok) throw new Error(r.statusText);
      }),
    onMutate: async (subscribed) => {
      await queryClient.cancelQueries({ queryKey: ["session", id] });
      queryClient.setQueryData(["schedule"], (old: Schedule) => ({
        ...old,
        sessions: [
          ...old.sessions.map((s) => (s.id === id ? { ...s, subscribed } : s)),
        ],
      }));
      queryClient.setQueryData(["session", id], (old: SessionDetails) => ({
        ...old,
        subscribed,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      queryClient.invalidateQueries({ queryKey: ["session", id] });
    },
  });
};

export const useGiveFeedback = (id: number) => {
  const token = useUser()?.token;
  const setUser = useSetUser();

  return useMutation({
    mutationKey: ["feedback", id],
    mutationFn: (answers: unknown[]) =>
      fetch(baseUrl + "/sessions/" + id + "/feedback", {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(answers),
      }).then((r) => {
        if (r.status === 401) setUser(null);
        if (!r.ok) throw new Error(r.statusText);
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session", id] });
    },
  });
};

export type HelpTask = {
  id: number;
  name: string;
  descriptionUrl: string | null;
  startTime: string;
  endTime: string;
  location: string;
  slotCount: number;
  status: "Available" | "Unavailable" | "Yours";
  assignedTo: (string | null)[];
};
export const useHelpTasks = () => {
  const token = useUser()?.token;

  return useQuery({
    queryKey: ["helpTasks"],
    queryFn: (): Promise<HelpTask[]> =>
      fetch(baseUrl + "/helpTasks", {
        headers: token
          ? new Headers({ Authorization: "Bearer " + token })
          : undefined,
      }).then((r) => r.json()),
  });
};

export const useTakeHelpTask = (id: number) => {
  const token = useUser()?.token;
  const setUser = useSetUser();

  return useMutation({
    mutationKey: ["takeHelpTask", id],
    mutationFn: (take: boolean) =>
      fetch(
        `${baseUrl}/helpTasks/${id}/${take ? "take?publishName=true" : "release"}`,
        {
          method: "POST",
          headers: new Headers({
            Authorization: "Bearer " + token,
          }),
        },
      ).then((r) => {
        if (r.status === 401) setUser(null);
        if (!r.ok) throw new Error(r.statusText);
      }),
    async onSuccess(_data, variables) {
      await queryClient.cancelQueries({ queryKey: ["helpTasks"] });
      queryClient.setQueryData(["helpTasks"], (old: HelpTask[]) => [
        ...old.map(
          (t): HelpTask =>
            t.id === id
              ? { ...t, status: variables ? "Yours" : "Available" }
              : t,
        ),
      ]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["helpTasks"] });
    },
  });
};

export type Profile = {
  name: string;
  qrCode: string | null;
  extraData: { label: string; value: string }[];
};

export const useProfile = () => {
  const token = useUser()?.token;
  const setUser = useSetUser();

  return useQuery({
    queryKey: [token, "profile"],
    enabled: !!token,
    queryFn: (): Promise<Profile> =>
      fetch(baseUrl + "/profile", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }).then((r) => {
        if (r.status === 401) setUser(null);
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      }),
  });
};
