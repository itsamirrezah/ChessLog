import useAuthorStories from "../../lib/services/author-stories";
import Feed from "../feed/feed";

export default function AuthorStories({ authorId }) {
  const stories = useAuthorStories(authorId);
  return <Feed {...stories} />;
}
