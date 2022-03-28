import { getSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { getStoryById } from "../../../api-lib/database/stories";
import { connectDatabase } from "../../../api-lib/database/utils";
import CreateStoryPage from "../../../components/pages/create-story/create-story";

export default function CreateStory({ story, hasUsername }) {
  return <CreateStoryPage story={story} hasUsername={hasUsername} />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const hasUsername = !!session.user.username;
  const { id } = context.query;
  if (!id) return { props: { hasUsername } };

  const client = await connectDatabase();

  const story = await getStoryById(client, id);
  if (!story) return { notFound: true };

  if (story.author._id !== session.user.id) {
    return {
      redirect: {
        destination: "/not-authorize",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["blog", story._id], () => story);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      story,
      hasUsername,
    },
  };
}
