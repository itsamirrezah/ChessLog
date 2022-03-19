import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useFollowUser(userId, isFollowByUser) {
  const queryClient = useQueryClient();
  return useMutation(
    () =>
      axios({
        url: `/api/users/${userId}/following`,
        method: isFollowByUser ? "DELETE" : "PUT",
      }).then((res) => res.data),
    {
      onMutate: (authorId) => {
        queryClient.cancelQueries("discover-user");
        const oldDiscoverUsers = queryClient.getQueryData("discover-user");
        const oldViewerEdgeUser = queryClient.getQueryData([
          "author-viewer-edge",
          authorId,
        ]);

        queryClient.setQueryData("discover-user", (old = []) => {
          return old.map((author) => {
            if (author._id === authorId) {
              return { ...author, isFollowed: !isFollowByUser };
            }
            return author;
          });
        });

        queryClient.setQueryData(
          ["author-viewer-edge", authorId],
          (old = {}) => ({ ...old, isViewerFollow: !isFollowByUser })
        );

        return () => {
          queryClient.setQueryData("discover-user", oldDiscoverUsers);
          queryClient.setQueryData(
            ["author-viewer-edge", authorId],
            oldViewerEdgeUser
          );
        };
      },

      onError: (err, variable, rollback) => {
        if (rollback) rollback();
      },
    }
  );
}
