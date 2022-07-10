import Header from "../../components/shared/sidebars/sidebar-header";
import useSavedStories from "../../lib/services/saved-stories";
import Item from "./item";
import TextButton from "../../components/shared/buttons/text-button";
import Link from "next/link";

export default function RecentlySaved({ userId }) {
  const { data } = useSavedStories(userId);

  if (!data || data.total === 0) return null;

  return (
    <div>
      <Header>Recently Saved</Header>
      {data.stories.map((story) => (
        <Item key={story._id} item={story} />
      ))}
      <Link href={`/users/${userId}/saved`}>
        <a>
          <TextButton color="#1a8a17">{`See all (${data.total})`}</TextButton>
        </a>
      </Link>
    </div>
  );
}
