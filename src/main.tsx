import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SafeArea, SafeAreaInsets } from "capacitor-plugin-safe-area";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./appContext.ts";
import "./index.css";
import { queryClient } from "./query.ts";

const setSafeArea = (data: SafeAreaInsets) => {
  const { insets } = data;

  for (const [key, value] of Object.entries(insets)) {
    document.documentElement.style.setProperty(
      `--safe-area-inset-${key}`,
      `${value}px`,
    );
  }
};

SafeArea?.addListener("safeAreaChanged", setSafeArea);
SafeArea?.getSafeAreaInsets().then(setSafeArea);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>,
);
