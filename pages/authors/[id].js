import { dehydrate, QueryClient } from "react-query";
import { getUserIds, getUserInfo } from "../../api-lib/database/users";
import { connectDatabase } from "../../api-lib/database/utils";
import AuthorPage from "../../components/pages/author/author";

export default function Author({ userInfo }) {
  return <AuthorPage author={userInfo} />;
}

export async function getStaticPaths() {
  // FIXME: pre fetch most popular authors
  const client = await connectDatabase();
  const userIds = await getUserIds(client);
  const paths = userIds.map((i) => ({ params: { id: i._id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const client = await connectDatabase();

  const { stories, ...user } = await getUserInfo(client, params.id, {
    stories: true,
  });
  //FIXME: cache author stories
  const userInfo = JSON.parse(JSON.stringify(user));
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["user", userInfo._id.toString()], () =>
    JSON.parse(JSON.stringify(user))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userInfo,
    },
  };
}
