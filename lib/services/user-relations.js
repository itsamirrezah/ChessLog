import usePagination from "../hooks/use-pagination";

export default function useUserRelations(userId, isFollowing, limit) {
  return usePagination(
    ["relations", isFollowing],
    `/api/users/${userId}/${isFollowing ? "following" : "followers"}`,
    limit
  );
}
