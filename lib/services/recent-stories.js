import usePagination from "../hooks/use-pagination";

export default function useRecentStories(userId) {
  return usePagination("blogs", `/api/stories`);
}
