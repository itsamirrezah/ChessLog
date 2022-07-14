import TabsManager from "../../components/shared/tabs-manager/tabs-manager";
import TabsList from "../../components/shared/tabs-manager/tabs-list";
import { TabItem } from "../../components/shared/tabs-manager/tabs-list";
import TabContentsList from "../../components/shared/tabs-manager/tab-contents-list";
import SavedStories from "../saved-stories/saved-stories";

export default function AuthorTabManager({ authorId, isAuthorized }) {
  return (
    <TabsManager>
      <TabsList>
        <TabItem>Home</TabItem>
        {isAuthorized && <TabItem>Bookmark</TabItem>}
      </TabsList>

      <TabContentsList>
        <p>Home</p>
        {isAuthorized && <SavedStories authorId={authorId} />}
      </TabContentsList>
    </TabsManager>
  );
}
