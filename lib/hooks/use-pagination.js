import axios from "axios";
import { useInfiniteQuery } from "react-query";

function fetch(context, url, limit) {
  return axios
    .get(url, {
      params: { limit: limit, page: context?.pageParam || 0 },
    })
    .then((res) => res.data);
}

export default function usePagination(key, url, limit = 10) {
  return useInfiniteQuery(key, (context) => fetch(context, url, limit), {
    getNextPageParam: (lastPage, _allPages) => {
      return lastPage.metadata.nextPage;
    },
  });
}
