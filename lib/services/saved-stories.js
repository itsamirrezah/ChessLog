import usePagination from "../hooks/use-pagination";

export default function useSaveStories(userId, limit) {
  return usePagination(
    ["collections", userId],
    true,
    `/api/users/${userId}/saved`,
    limit
  );
}
