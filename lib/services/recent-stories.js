import usePagination from "../hooks/use-pagination";

export default function useRecentStories(userId) {
  return usePagination("blogs", { enabled: !userId }, `/api/stories`);
}
