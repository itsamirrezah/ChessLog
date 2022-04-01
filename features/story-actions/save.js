import AuthProtected from "../../components/shared/wrapper/auth-protected";
import IconBookmark from "../../components/shared/icons/bookmark";
import useViewerEdgeStory from "../../lib/services/viewer-edge-story";
import useSaveStory from "../../lib/services/save-story";
import useAuth from "../../lib/context/auth-context";

export default function Save({ storyId }) {
  const { user } = useAuth();
  const { data } = useViewerEdgeStory(storyId);
  const { mutate: mutateSaveStory } = useSaveStory(user?.id);

  return (
    <AuthProtected>
      <IconBookmark
        isFill={data?.isBookmark}
        size="lg"
        onClick={() => mutateSaveStory({ storyId, isSaved: !data.isBookmark })}
      />
    </AuthProtected>
  );
}
