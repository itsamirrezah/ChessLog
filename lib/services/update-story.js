import axios from "axios";
import { useMutation } from "react-query";

export default function useUpdateStory(storyId) {
  return useMutation(({ story }) =>
    axios.put(`/api/stories/${storyId}`, { story })
  );
}
