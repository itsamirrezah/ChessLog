import Layout from "./layout";
import MainPage from "../../shared/layout/main-content";
import Side from "../../shared/sidebars/container";
import AuthorDetail from "../../../features/author-detail-sidebar/author-detail-sidebar";
import Main from "../home/styled/main";
import useAuth from "../../../lib/context/auth-context";
import AuthorTabManager from "../../../features/author-tab-manager/author-tab-manager";

export default function AuthorPage({ author }) {
  const { user } = useAuth();

  return (
    <Layout logo={author.name}>
      <MainPage grid width={1192}>
        <Main>
          <AuthorTabManager
            authorId={author._id}
            isAuthorized={user && user.id === author._id}
          />
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
