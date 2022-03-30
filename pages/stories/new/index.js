import { getSession } from "next-auth/react";
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
  const client = await connectDatabase();
  if (!id) {
    const story = await createStory(client, {
      _id: ObjectId(session.user.id),
      name: session.user.name,
      email: session.user.email,
      username: session.user.username,
    });
    return {
      props: { story: JSON.parse(JSON.stringify(story)), hasUsername },
    };
  }

  const story = await getStoryById(client, id);
  if (!story) return { notFound: true };

  if (story.author._id.toString() !== session.user.id) {
    return {
      redirect: {
        destination: "/not-authorize",
        permanent: false,
      },
    };
  }

  return {
    props: {
      story: JSON.parse(JSON.stringify(story)),
      hasUsername,
    },
  };
}
