import useSaveStories from "../../lib/services/saved-stories";
import Feed from "../feed/feed";
export default function SavedStories({ authorId }) {
  const savedStories = useSaveStories(authorId);
  return <Feed {...savedStories} userId={authorId} />;
}
