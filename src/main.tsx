import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeArea, SafeAreaInsets } from "capacitor-plugin-safe-area";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
