import Layout from "./layout";
import MainPage from "../../shared/layout/main-content";
import Side from "../../shared/sidebars/container";
import AuthorDetail from "../../../features/author-detail-sidebar/author-detail-sidebar";
import TabsManager from "../../shared/tabs-manager/tabs-manager";
import TabsList from "../../shared/tabs-manager/tabs-list";
import TabContentsList from "../../shared/tabs-manager/tab-contents-list";
import { TabItem } from "../../shared/tabs-manager/tabs-list";
import Main from "../home/styled/main";

export default function Author() {
  const author = {
    _id: "62cad0fe54454aaebad42ee3",
    email: "email@gmail.com",
    username: "@username",
    name: "@name",
    about:
      "Writer, blogger, activist. Blog: https://pluralistic.net; Mailing list: https://pluralistic.net/plura-list; Twitter: https://twitter.com/doctorow",
  };
  return (
    <Layout>
      <MainPage grid width={1192}>
        <Main>
          <TabsManager>
            <TabsList>
              <TabItem>Home</TabItem>
              <TabItem>Bookmark</TabItem>
            </TabsList>

            <TabContentsList>
              <p>Home</p>
              <p>Bookmark</p>
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
