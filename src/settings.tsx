import React from "react";

const SESSION_WATCH_KEY = "session_watch";

const loadSessionWatches = (): string[] => {
  try {
    const raw = localStorage.getItem(SESSION_WATCH_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const SettingsContext: React.Context<{
  sessionWatch: string[];
  setSessionWatch: (newSessionWatch: string[]) => void;
}> = React.createContext({
  sessionWatch: [] as string[],
  setSessionWatch: (_newSessionWatch: string[]) => {},
});

const { Provider } = SettingsContext;

export const SettingsContextProvider = (props: any) => {
  const [sessionWatch, setSessionWatch] =
    React.useState<string[]>(loadSessionWatches());
  const setSessionWatchWrapper = (newSessionWatch: string[]) => {
    localStorage.setItem(SESSION_WATCH_KEY, JSON.stringify(newSessionWatch));
    setSessionWatch(newSessionWatch);
  };
  return (
    <Provider
      value={{
        sessionWatch,
        setSessionWatch: setSessionWatchWrapper,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useGetWatchesSession = () => {
  const { sessionWatch } = React.useContext(SettingsContext);
  return (sessionId: string): boolean => {
    return sessionWatch.includes(sessionId);
  };
};

export const useSetWatchesSession = () => {
  const { setSessionWatch } = React.useContext(SettingsContext);
  return (sessionId: string, value: boolean) => {
    let sessionWatch = loadSessionWatches();
    if (value) {
      sessionWatch.push(sessionId);
    } else {
      sessionWatch = sessionWatch.filter((s: string) => s !== sessionId);
    }
    setSessionWatch(sessionWatch);
  };
};
