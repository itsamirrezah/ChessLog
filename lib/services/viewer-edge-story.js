import { useQuery } from "react-query";
import axios from "axios";

export default function useViewerEdgeStory(story) {
  return useQuery(
    ["post-viewer-edge", story._id],
    () =>
      axios
        .get(`/api/stories/${story._id}/viewer-edge`)
        .then((res) => res.data),
    {
      placeholderData: story,
    }
  );
}
