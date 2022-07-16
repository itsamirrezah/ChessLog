import usePagination from "../hooks/use-pagination";

export default function useSaveStories(userId, limit) {
  return usePagination(
    ["collections", userId],
    `/api/users/${userId}/saved`,
    limit
  );
}
