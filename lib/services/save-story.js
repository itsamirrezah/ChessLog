import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useSaveStory(userId) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ storyId, isSaved }) =>
      axios
        .put(`/api/users/${userId}/saved`, { storyId, isSaved })
        .then((res) => res.data),
    {
      onMutate: ({ storyId, isSaved }) => {
        queryClient.cancelQueries("timeline");
        queryClient.cancelQueries(["story-viewer-edge", storyId]);

        const oldBlogs = queryClient.getQueryData("timeline");
        const oldViewerEdgeStory = queryClient.getQueriesData([
          "story-viewer-edge",
          storyId,
        ]);

        queryClient.setQueryData("timeline", (old) => {
          if (!old) return null;
          const oldPages = old.pages.map((page) => {
            return {
              ...page,
              stories: page.stories.map((s) => {
                if (s._id === storyId) return { ...s, isSaved };
                return s;
              }),
            };
          });
          return { ...old, pages: oldPages };
        });

        queryClient.setQueryData(["story-viewer-edge", storyId], (old) => {
          return { ...old, isBookmark: !old.isBookmark };
        });

        return () => {
          queryClient.setQueryData("timeline", oldBlogs);
          queryClient.setQueryData(
            ["story-viewer-edge", storyId],
            oldViewerEdgeStory
          );
        };
      },
      onError: (error, user, rollback) => {
        if (rollback) rollback();
      },
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries("timeline");
        queryClient.invalidateQueries(["story-viewer-edge", variables.storyId]);
      },
    }
  );
}
