import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import useAuth from "../context/auth-context";

export default function useClapStory(storyId) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userClaps, setUserClaps] = useState(0);

  const mutation = useMutation(
    ({ userClaps }) =>
      axios
        .put(`/api/stories/${storyId}/clap`, {
          userClaps,
        })
        .then((res) => res.data),
    {
      onError: (error, user, rollback) => {
        queryClient.invalidateQueries(["story-viewer-edge", storyId]);
        queryClient.invalidateQueries(["story", storyId]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["story-viewer-edge", storyId]);
      },
    }
  );

  function mutate() {
    setUserClaps((claps) => claps + 1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userClaps <= 0) return;
      mutation.mutate({ userClaps });
      setUserClaps(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [userClaps]);

  useEffect(() => {
    if (userClaps <= 0) return;
    queryClient.setQueryData(["story", storyId], (old) => {
      return {
        ...old,
        claps: { ...old.claps, [user.id]: old.claps[user.id] + 1 || 1 },
        allClaps: old.allClaps + 1,
      };
    });

    queryClient.setQueryData(["story-viewer-edge", storyId], (old) => {
      return { ...old, isClap: true, claps: old.claps + 1 };
    });
  }, [userClaps]);

  return { ...mutation, mutate };
}
