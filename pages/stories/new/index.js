import { getSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { getStoryById } from "../../../api-lib/database/stories";
import { connectDatabase } from "../../../api-lib/database/utils";
import CreateStoryPage from "../../../components/pages/create-story/create-story";

export default function NewSto({ storyId }) {
  return <CreateStoryPage storyId={storyId} />;
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

  const { id } = context.query;
  if (!id) return { props: {} };

  const client = await connectDatabase();
  const story = await getStoryById(client, id);
  if (!story) return { notFound: true };

  if (story.author.email !== session.user.email) {
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
      storyId: story._id,
    },
  };
}
