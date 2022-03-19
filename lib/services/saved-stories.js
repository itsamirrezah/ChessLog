import axios from "axios";
import { useQuery } from "react-query";

export default function useSaveStories(userId) {
  return useQuery(
    ["collections", userId],
    () => axios.get(`/api/users/${userId}/saved`).then((res) => res.data),
    {
      enabled: !!userId,
    }
  );
}
