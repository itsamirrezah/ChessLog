import Container from "./styled/container";
import LeftSide from "./styled/left-side";
import RightSide from "./styled/right-side";
import Content from "./styled/content";
import AuthorDetail from "../../../features/author-detail-sidebar/author-detail-sidebar";
import StoryActions from "../../../features/story-actions/story-actions";
import Story from "../../../features/story/story";
import AuthorDetailHeader from "../../../features/author-detail-header/author-detail-header";
import WhoToFollow from "../../../features/who-to-follow/who-to-follow";

import Layout from "./layout";

export default function StoryPage({ story }) {
  // TODO: hide/show both sidebars if header has not intersected
  return (
    <Layout authorDetailHeader={<AuthorDetailHeader author={story.author} />}>
      <Container>
        <LeftSide>
          <AuthorDetail author={story.author} />
          <StoryActions story={story} />
        </LeftSide>

        <Content>
          <Story story={story} />
        </Content>

        <RightSide>
          <WhoToFollow />
          {/* TODO: recent stories + who to follow*/}
        </RightSide>
      </Container>
    </Layout>
  );
}
