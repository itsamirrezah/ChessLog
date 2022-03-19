import { getSession } from "next-auth/react";
import { dehydrate, QueryClient } from "react-query";
import { getPostById } from "../../../api-lib/database/posts";
import { connectDatabase } from "../../../api-lib/database/utils";
import NewPostPage from "../../../components/pages/create-story/create-story";
import Layout from "../../../components/pages/create-story/layout";

export default function NewSto({ postId }) {
  return <NewPostPage postId={postId} />;
}

function getLayout(page) {
  return <Layout>{page}</Layout>;
}

NewSto.getLayout = getLayout;

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
  const post = await getPostById(client, id);
  if (!post) return { notFound: true };

  if (post.author.email !== session.user.email) {
    return {
      redirect: {
        destination: "/not-authorize",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["blog", post._id], () => post);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      postId: post._id,
    },
  };
}
