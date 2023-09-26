import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

export const dataSource = {
  endpoint: "https://d2pmqswy9qlmav.cloudfront.net/graphql",
  fetchParams: {
    headers: {
      "Content-Type": "application/json",
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 3 * 60 * 1000,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
