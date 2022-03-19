import { useMutation } from "react-query";
import axios from "axios";

export default function useCreateUser() {
  return useMutation(
    (user) => axios.post("/api/auth/register", user).then((res) => res.data),
    { cacheTime: 0 }
  );
}
