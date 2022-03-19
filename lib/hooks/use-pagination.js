import axios from "axios";
import { useInfiniteQuery } from "react-query";

function fetch(context, url) {
  return axios
    .get(url, {
      params: { limit: 3, page: context?.pageParam || 0 },
    })
    .then((res) => res.data);
}

export default function usePagination(key, enabled, url) {
  return useInfiniteQuery(key, (context) => fetch(context, url), {
    getNextPageParam: (lastPage, _allPages) => {
      return lastPage.metadata.nextPage;
    },

    ...enabled,
  });
}
