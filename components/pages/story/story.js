import Content from "./styled/content";
import AuthorDetail from "../../../features/author-detail-sidebar/author-detail-sidebar";
import StoryActions from "../../../features/story-actions/story-actions";
import Story from "../../../features/story/story";
import AuthorDetailHeader from "../../../features/author-detail-header/author-detail-header";
import WhoToFollow from "../../../features/who-to-follow/who-to-follow";
import MainPage from "../../shared/layout/main-content";
import Layout from "./layout";
import { useState } from "react";
import { useCallback } from "react";
import Side from "../../shared/sidebars/container";

export default function StoryPage({ story }) {
  const [hideSideBars, setHideSideBars] = useState(false);
  const handler = useCallback((value) => {
    setHideSideBars(value);
  }, []);

  return (
    <Layout
      authorDetailHeader={<AuthorDetailHeader author={story.author} />}
      handler={handler}
    >
      <MainPage grid width={1504}>
        <Side left gridColumn={1} span={2} isHidden={!hideSideBars}>
          <AuthorDetail author={story.author} />
          <StoryActions story={story} />
        </Side>

        <Content>
          <Story story={story} />
        </Content>

        <Side right gridColumn={10} span={3} isHidden={!hideSideBars}>
          <WhoToFollow />
        </Side>
      </MainPage>
    </Layout>
  );
}
