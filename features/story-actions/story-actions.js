// import useViewerEdge from "../../lib/context/viewer-edge-context";
import IconBookmark from "../../components/shared/icons/bookmark";
import IconClap from "../../components/shared/icons/clap";
import IconComment from "../../components/shared/icons/comment";
import Action from "./styled/action";
import Container from "./styled/container";
import useViewerEdgeStory from "../../lib/services/viewer-edge-story";
import AuthProtected from "../../components/shared/wrapper/auth-protected";
import useClapStory from "../../lib/services/clap-story";
import useStory from "../../lib/services/story";
import abbreviatedNumber from "../../lib/utils/abbreviated-number";
import useSaveStory from "../../lib/services/save-story";
import useAuth from "../../lib/context/auth-context";

export default function StoryActions({ story }) {
  const { user } = useAuth();
  const { mutate } = useClapStory(story._id);
  const { data } = useViewerEdgeStory(story);
  const { data: storyData } = useStory(story);
  const { mutate: mutateSaveStory } = useSaveStory(user?.id);

  return (
    <Container>
      <Action>
        <AuthProtected
          Component={IconClap}
          isFill={data?.isClap}
          size="lg"
          onClick={mutate}
        />
        <p>{abbreviatedNumber(storyData.allClaps)}</p>
      </Action>
      {/* TODO: comments feature */}
      <Action>
        <IconComment size="lg" />
        <p>{abbreviatedNumber(8931231)}</p>
      </Action>
      <Action>
        <AuthProtected
          Component={IconBookmark}
          isFill={data?.isBookmark}
          size="lg"
          onClick={() =>
            mutateSaveStory({ storyId: story._id, isSaved: !data.isBookmark })
          }
        />
      </Action>
    </Container>
  );
}
