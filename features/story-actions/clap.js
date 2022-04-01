import AuthProtected from "../../components/shared/wrapper/auth-protected";
import IconClap from "../../components/shared/icons/clap";
import useClapStory from "../../lib/services/clap-story";
import useViewerEdgeStory from "../../lib/services/viewer-edge-story";

export default function Clap({ storyId }) {
  const { mutate } = useClapStory(storyId);
  const { data } = useViewerEdgeStory(storyId);

  return (
    <AuthProtected>
      <IconClap isFill={data?.isClap} size="lg" onClick={mutate} />
    </AuthProtected>
  );
}
