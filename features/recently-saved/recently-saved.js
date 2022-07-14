import Header from "../../components/shared/sidebars/sidebar-header";
import useSavedStories from "../../lib/services/saved-stories";
import Item from "./item";
import TextButton from "../../components/shared/buttons/text-button";
import Link from "next/link";

export default function RecentlySaved({ userId }) {
  const { data: allPages } = useSavedStories(userId, 3);

  const page = allPages?.pages[0];
  if (!page || page?.metadata.total === 0) return null;

  return (
    <div>
      <Header>Recently Saved</Header>
      {page.stories.map((story) => (
        <Item key={story._id} item={story} />
      ))}
      <Link href={`/users/${userId}/saved`}>
        <a>
          <TextButton color="#1a8a17">{`See all (${page.metadata.total})`}</TextButton>
        </a>
      </Link>
    </div>
  );
}
