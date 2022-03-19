import axios from "axios";
import { useQuery } from "react-query";

export default function useDiscoverUsers() {
  return useQuery("discover-user", () =>
    axios.get("/api/discover/users").then((res) => res.data)
  );
}
