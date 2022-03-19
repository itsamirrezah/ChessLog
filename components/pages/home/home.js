import Container from "./styled/container";
import Main from "./styled/main";
import Feed from "../../../features/feed/feed";
import Side from "./styled/side";
import WhoToFollow from "../../../features/who-to-follow/who-to-follow";
import RecentlySaved from "../../../features/recently-saved/recently-saved";
import Layout from "./layout";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <Container>
        <Main>
          <Feed userId={user?.id} />
        </Main>
        <Side>
          <WhoToFollow />
          {user && <RecentlySaved userId={user.id} />}
        </Side>
      </Container>
    </Layout>
  );
}
