import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import useAuth from "../context/auth-context";

export default function useClapStory(storyId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    () => axios.put(`/api/stories/${storyId}/clap`).then((res) => res.data),
    {
      onMutate: () => {
        queryClient.cancelQueries(["story", storyId]);
        queryClient.cancelQueries(["post-viewer-edge", storyId]);
        const oldStory = queryClient.getQueryData(["story", storyId]);
        const oldViewerEdgeStory = queryClient.getQueryData([
          "post-viewer-edge",
          storyId,
        ]);

        queryClient.setQueryData(["story", storyId], (old) => {
          return {
            ...old,
            claps: { ...old.claps, [user.id]: old.claps[user.id] + 1 || 1 },
            allClaps: old.allClaps + 1,
          };
        });

        queryClient.setQueryData(["post-viewer-edge", storyId], (old) => {
          return { ...old, isClap: true, claps: old.claps + 1 };
        });

        return () => {
          queryClient.setQueryData(["story", storyId], oldStory);
          queryClient.setQueriesData(
            ["post-viewer-edge", storyId],
            oldViewerEdgeStory
          );
        };
      },

      onError: (error, user, rollback) => {
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries(["post-viewer-edge", storyId]);
      },
    }
  );
}
