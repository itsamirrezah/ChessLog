import IconComment from "../../components/shared/icons/comment";
import Action from "./styled/action";
import Container from "./styled/container";
import useStory from "../../lib/services/story";
import abbreviatedNumber from "../../lib/utils/abbreviated-number";
import Clap from "./clap";
import Save from "./save";

export default function StoryActions({ story }) {
  const { data } = useStory(story);
  return (
    <Container>
      <Action>
        <Clap storyId={data._id} />
        <p>{abbreviatedNumber(data.allClaps)}</p>
      </Action>
      <Action>
        <IconComment size="lg" />
        <p>{abbreviatedNumber(8931231)}</p>
      </Action>
      <Action>
        <Save storyId={data._id} />
      </Action>
    </Container>
  );
}
