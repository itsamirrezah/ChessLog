import { useQuery } from "react-query";
import axios from "axios";

export default function useUser(user) {
  return useQuery(
    ["user", user._id],
    () => axios.get(`/api/users/${user._id}`).then((res) => res.data),
    {
      placeholderData: user,
    }
  );
}
