import usePagination from "../hooks/use-pagination";

export default function useTimeline(userId) {
  return usePagination("timeline", `/api/users/${userId}/timeline`);
}
