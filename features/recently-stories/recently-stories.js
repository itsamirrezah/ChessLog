import useRecentStories from "../../lib/services/recent-stories";
import Feed from "../feed/feed";

export default function RecentlyStories() {
  const recentlyStories = useRecentStories(null);
  return <Feed {...recentlyStories} />;
}
