import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useState,
} from "react";

type AppContextData = {
  user: { token: string; guest: false } | { token: null; guest: true } | null;
};

const AppContext = createContext<
  | {
      value: AppContextData;
      setValue: React.Dispatch<React.SetStateAction<AppContextData>>;
    }
  | undefined
>(undefined);

const SESSION_TOKEN = "session_token";
const IS_GUEST = "is_guest";

const loadFromStorage = (): AppContextData => {
  try {
    const token = localStorage.getItem(SESSION_TOKEN);
    if (token) return { user: { token, guest: false } };
    const isGuest = localStorage.getItem(IS_GUEST);
    if (isGuest === "true") return { user: { token: null, guest: true } };
    return { user: null };
  } catch (e) {
    return { user: null };
  }
};
const saveUserToStorage = (user: AppContextData["user"]) => {
  if (user === null) {
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.removeItem(IS_GUEST);
  } else if (user.guest) {
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.setItem(IS_GUEST, "true");
  } else {
    localStorage.setItem(SESSION_TOKEN, user.token);
    localStorage.removeItem(IS_GUEST);
  }
};

export const useUser = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useUser must be used within an AppContextProvider");
  return context.value.user;
};

export const useSetUser = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useSetUser must be used within an AppContextProvider");
  return (user: AppContextData["user"]) => {
    context.setValue((previous) => ({ ...previous, user }));
    saveUserToStorage(user);
  };
};

export const AppContextProvider = (props: { children: ReactNode }) => {
  const [value, setValue] = useState(() => loadFromStorage());

  return createElement(AppContext.Provider, {
    value: { value, setValue },
    children: props.children,
  });
};
