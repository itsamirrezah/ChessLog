import CreateStory from "../../../features/create-story/create-story";
import MainPage from "../../shared/layout/main-content";
import Layout from "./layout";

export default function CreateStoryPage() {
  return (
    <Layout>
      <MainPage width={740}>
        <CreateStory />
      </MainPage>
    </Layout>
  );
}
