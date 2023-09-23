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

export const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
