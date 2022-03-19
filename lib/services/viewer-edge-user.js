import { useQuery } from "react-query";
import axios from "axios";

export default function useViewerEdgeUser(authorId) {
  return useQuery(["author-viewer-edge", authorId], () =>
    axios.get(`/api/users/${authorId}/viewer-edge`).then((res) => res.data)
  );
}
