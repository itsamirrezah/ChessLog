import { useQuery } from "react-query";
import axios from "axios";

export default function useUserFollowers(userId) {
  return useQuery(
    ["user-follow", userId],
    axios.get(`/api/users/${userId}/followers`).then((res) => res.data)
  );
}
