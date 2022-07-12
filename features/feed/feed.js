import Item from "./item";
import Fallback from "./fallback";
import { Fragment, useEffect } from "react";
import useIntersection from "../../lib/hooks/use-intersection";

export default function Feed({
  hasNextPage,
  data,
  isFetchingNextPage,
  fetchNextPage,
  userId,
}) {
  const { isIntersecting, ref } = useIntersection(0.2);

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage]);

  if (!data?.pages) return null;

  const tlCount = data.pages[0].metadata.total;

  return (
    <>
      {data.pages.map((page, index) => (
        <Fragment key={index}>
          {page.stories.map((story) => (
            <Item key={story._id} story={story} userId={userId} />
          ))}
        </Fragment>
      ))}
      {tlCount === 0 && <Fallback />}
      {hasNextPage && (
        <p
          ref={ref}
          style={{
            textAlign: "center",
            fontSize: 20,
            visibility: isFetchingNextPage ? "visible" : "hidden",
          }}
        >
          . . .
        </p>
      )}
    </>
  );
}
