import Main from "./styled/main";
import Feed from "../../../features/feed/feed";
import Side from "../../shared/sidebars/container";
import WhoToFollow from "../../../features/who-to-follow/who-to-follow";
import RecentlySaved from "../../../features/recently-saved/recently-saved";
import Layout from "./layout";
import MainPage from "../../shared/layout/main-content";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <MainPage grid width={1192}>
        <Main>
          <Feed userId={user?.id} />
        </Main>
        <Side right gridColumn={9} span={4}>
          <WhoToFollow />
          {user && <RecentlySaved userId={user.id} />}
        </Side>
      </MainPage>
    </Layout>
  );
}
