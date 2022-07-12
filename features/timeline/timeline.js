import useTimeline from "../../lib/services/timeline";
import Feed from "../feed/feed";

export default function Timeline({ userId }) {
  const timeline = useTimeline(userId);

  return <Feed {...timeline} userId={userId} />;
}
