import usePagination from "../hooks/use-pagination";

export default function useAuthorStories(authorId) {
  return usePagination(
    ["stories", authorId],
    `/api/stories/author/${authorId}`
  );
}
