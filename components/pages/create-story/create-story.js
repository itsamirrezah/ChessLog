import CreateStory from "../../../features/create-story/create-story";
import MainPage from "../../shared/layout/main-content";
import Layout from "./layout";
import UsernameRequiredModal from "../../../features/username-required/username-required-modal";
import { NewStoryProvider } from "../../../features/create-story/context/new-story-context";

export default function CreateStoryPage({ story, hasUsername }) {
  return (
    <NewStoryProvider>
      <>
        <Layout>
          <MainPage width={740}>
            <CreateStory prefetchStory={story} />
          </MainPage>
        </Layout>
        {!hasUsername && <UsernameRequiredModal />}
      </>
    </NewStoryProvider>
  );
}
