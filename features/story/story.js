import Avatar from "../../components/shared/avatar/avatar";
import Metadata from "./styled/metadata";
import Info from "../../components/shared/stories/info";
import Header from "./styled/header";
import H1 from "./styled/h1";
import H2 from "./styled/h2";
import AspectImage from "../../components/shared/image/aspect-image";
import useStory from "../../lib/services/story";
import useUser from "../../lib/services/user";

export default function Story({ story }) {
  const { data } = useStory(story);
  const { data: authorInfo } = useUser(story.author);

  return (
    <>
      <Metadata>
        <Avatar size={44} src={authorInfo?.image || "/cover.jpg"} alt="alt" />
        <div>
          <p>{authorInfo.name}</p>
          <Info />
        </div>
      </Metadata>
      <Header>
        <H1>{data?.title}</H1>
        <H2>{data?.excerpt}</H2>
        <AspectImage src={data?.header} />
      </Header>
      <>
        {/* TODO: use react-markdown  */}
        {data.content.map((c, i) => (
          <p key={i}>{c.content}</p>
        ))}
      </>
    </>
  );
}
