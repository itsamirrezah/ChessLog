import { getSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { createStory, getStoryById } from "../../../api-lib/database/stories";
import { connectDatabase } from "../../../api-lib/database/utils";
import CreateStoryPage from "../../../components/pages/create-story/create-story";
import { ObjectId } from "mongodb";

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
  // if (!id) return { props: { hasUsername } };
  const client = await connectDatabase();
  if (!id) {
    // create a story on server
    // get the story created.
    const story = await createStory(client, {
      _id: ObjectId(session.user.id),
      name: session.user.name,
      email: session.user.email,
      username: session.user.username,
      image: session.user.image,
    });
    // send the story to client.
    return {
      props: { story, hasUsername },
    };
  }

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

  // FIXME: get story from db.
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
