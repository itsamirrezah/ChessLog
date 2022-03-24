export const config = {
  defaultOptions: {
    queries: {
      staleTime: 7200000,
      refetchOnWindowFocus: false,
      cacheTime: 108000000,
      retry: 3,
      retryDelay: 10,
    },
  },
};
