import axios from "axios";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

export default function useValidateUsername(username, enabled) {
  const [fire, setFire] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => {
      setFire(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [username, enabled]);

  const query = useQuery(
    //FIXME: no query key?
    ["username", username],
    ({ signal }) =>
      axios
        .get(`/api/users/validity?username=${username}`, { signal })
        .then((res) => res.data),
    {
      enabled: enabled && fire,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (fire) {
      setFire(false);
    }
  }, [fire]);

  return query;
}
