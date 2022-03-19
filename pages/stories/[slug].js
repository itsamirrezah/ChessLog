// /stories/article-title
import { connectDatabase } from "../../api-lib/database/utils";
import { getAllSlugs, getStoryBySlug } from "../../api-lib/database/stories";
import { dehydrate, QueryClient } from "react-query";
import Story from "../../components/pages/story/story";

export default function StoryPage({ story }) {
  return <Story story={story} />;
}

export async function getStaticPaths() {
  const client = await connectDatabase();
  const allLink = await getAllSlugs(client);
  const paths = allLink.map((i) => ({ params: { slug: i.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const client = await connectDatabase();
  const queryClient = new QueryClient();
  // FIXME: get story by id
  const story = JSON.parse(
    JSON.stringify(await getStoryBySlug(client, params.slug))
  );
  await queryClient.prefetchQuery(["blog", story._id], () => story);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      story,
    },
    revalidate: 800,
  };
}
