import axios from "axios";
import { useQuery } from "react-query";

export default function useSearchTag(searchQuery) {
  return useQuery(
    ["tag", searchQuery],
    ({ signal }) =>
      axios
        .get(`/api/tags?q=${searchQuery}`, { signal })
        .then((res) => res.data),
    {
      enabled: !!searchQuery,
    }
  );
}
