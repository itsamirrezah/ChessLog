import axios from "axios";
import { useMutation } from "react-query";

export default function useSetUsername(userId) {
  return useMutation(
    ({ username }) =>
      axios.put(`/api/users/${userId}`, { username }).then((res) => res.data),
    {
      enabled: !!userId,
    }
  );
}
