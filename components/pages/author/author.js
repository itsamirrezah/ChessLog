import Layout from "./layout";
import MainPage from "../../shared/layout/main-content";
import Side from "../../shared/sidebars/container";
import AuthorDetail from "../../../features/author-detail-sidebar/author-detail-sidebar";
import TabsManager from "../../shared/tabs-manager/tabs-manager";
import TabsList from "../../shared/tabs-manager/tabs-list";
import TabContentsList from "../../shared/tabs-manager/tab-contents-list";
import { TabItem } from "../../shared/tabs-manager/tabs-list";
import Main from "../home/styled/main";
import useAuth from "../../../lib/context/auth-context";

export default function AuthorPage({ author }) {
  const { user } = useAuth();
  const isAuthorized = user && user.id === author._id;

  return (
    <Layout>
      <MainPage grid width={1192}>
        <Main>
          <TabsManager>
            <TabsList>
              <TabItem>Home</TabItem>
              {isAuthorized && <TabItem>Bookmark</TabItem>}
            </TabsList>

            <TabContentsList>
              <p>Home</p>
              {isAuthorized && <p>Bookmark</p>}
            </TabContentsList>
          </TabsManager>
        </Main>
        <Side right gridColumn={10} span={3}>
          <div>
            <AuthorDetail author={author} />
            <div>Following Section</div>
          </div>
        </Side>
      </MainPage>
    </Layout>
  );
}
