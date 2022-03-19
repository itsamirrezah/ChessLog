import usePagination from "../hooks/use-pagination";

export default function useTimeline(userId) {
  return usePagination(
    "timeline",
    { enabled: !!userId },
    `/api/users/${userId}/timeline`
  );
}
