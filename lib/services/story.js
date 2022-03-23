import { useQuery } from "react-query";
import axios from "axios";

export default function useStory(story) {
  return useQuery(
    ["story", story._id],
    () => axios.get(`/api/stories/${story._id}`).then((res) => res.data),
    {
      initialData: () => story,
      enabled: !!story,
    }
  );
}
