import { QueryClient, dehydrate } from "react-query";
import { connectDatabase } from "../api-lib/database/utils";
import Home from "../components/pages/home/home";
import { getSession } from "next-auth/react";
import { getRecentlyStories } from "../api-lib/database/stories";

export default function HomePage({ user }) {
  return <Home user={user} />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      props: {
        user: session.user,
      },
    };
  }

  const client = await connectDatabase();
  const queryClient = new QueryClient();
  const recentlyStories = await getRecentlyStories(client, 0, 0, 4);

  await queryClient.prefetchQuery("blogs", () =>
    // FIXME: look for simpler solution
    ({
      pages: [JSON.parse(JSON.stringify(recentlyStories))],
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
