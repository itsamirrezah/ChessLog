import Main from "./styled/main";
// import Feed from "../../../features/feed/feed";
import Timeline from "../../../features/timeline/timeline";
import Side from "../../shared/sidebars/container";
import WhoToFollow from "../../../features/who-to-follow/who-to-follow";
import RecentlySaved from "../../../features/recently-saved/recently-saved";
import Layout from "./layout";
import MainPage from "../../shared/layout/main-content";
import RecentlyStories from "../../../features/recently-stories/recently-stories";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <MainPage grid width={1192}>
        <Main>
          {user?.id && <Timeline userId={user?.id} />}
          {!user?.id && <RecentlyStories />}
        </Main>
        <Side right gridColumn={9} span={4}>
          <WhoToFollow />
          {user && <RecentlySaved userId={user.id} />}
        </Side>
      </MainPage>
    </Layout>
  );
}
