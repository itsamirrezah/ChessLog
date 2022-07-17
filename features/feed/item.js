import Container from "./styled/container";
import Main from "./styled/main";
import InfoWrapper from "./styled/info";
import Link from "next/link";
import Header from "../../components/shared/stories/styled/header";
import H2 from "./styled/h2";
import H3 from "./styled/h3";
import H4 from "./styled/h4";
import Info from "../../components/shared/stories/info";
import Line from "../../components/shared/dividers/line";
import IconBookmark from "../../components/shared/icons/bookmark";
import Author from "./styled/author";
import Avatar from "../../components/shared/avatar/avatar";
import AuthProtected from "../../components/shared/wrapper/auth-protected";
import useSaveStory from "../../lib/services/save-story";

export default function Item({ story, userId }) {
  const { mutate } = useSaveStory(userId);

  return (
    <>
      <Container>
        <Main>
          <Link href={`/users/${story.author.username}`}>
            <a>
              <Author>
                <Avatar size={20} src="/cover.jpg" alt={story.author.name} />
                <H4>{story.author.name}</H4>
              </Author>
            </a>
          </Link>
          <Link href={`/stories/${story.slug}`}>
            <a>
              <div style={{ marginBottom: 4 }}>
                <H2>{story.title}</H2>
              </div>
              <H3>{story.excerpt}</H3>
            </a>
          </Link>
          <InfoWrapper>
            <Info />
            <AuthProtected>
              <IconBookmark
                isFill={story.isSaved}
                onClick={() =>
                  mutate({ storyId: story._id, isSaved: !story.isSaved })
                }
              />
            </AuthProtected>
          </InfoWrapper>
        </Main>
        <div>
          <Header src={story?.header || "/cover.jpg"} alt={story.excerpt} />
        </div>
      </Container>
      <Line />
    </>
  );
}
