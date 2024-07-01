import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useState,
} from "react";

type AppContextData = {
  user: { name: string } | null;
};

const defaultValue: AppContextData = {
  user: null,
};
const AppContext = createContext<
  | {
      value: AppContextData;
      setValue: React.Dispatch<React.SetStateAction<AppContextData>>;
    }
  | undefined
>(undefined);

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
  return (user: AppContextData["user"]) =>
    context.setValue((previous) => ({ ...previous, user }));
};

export const AppContextProvider = (props: { children: ReactNode }) => {
  const [value, setValue] = useState(defaultValue);

  return createElement(AppContext.Provider, {
    value: { value, setValue },
    children: props.children,
  });
};
