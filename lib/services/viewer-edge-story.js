import { useQuery } from "react-query";
import axios from "axios";

export default function useViewerEdgeStory(storyId) {
  return useQuery(["story-viewer-edge", storyId], () =>
    axios.get(`/api/stories/${storyId}/viewer-edge`).then((res) => res.data)
  );
}
