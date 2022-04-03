import Container from "../../shared/layout/container";
import Navigation from "../../shared/nav/container";
import Logo from "../../shared/nav/logo";
import Spacer from "../../shared/dividers/spacer";
import PublishButton from "../../shared/buttons/publish-button";
import Items from "../../shared/nav/items";
import { NewStoryProvider } from "../../../features/create-story/context/new-story-context";
import UserActionHeader from "../../../features/user-actions-header/user-action-header";

export default function Layout({ children }) {
  // context new story
  return (
    <NewStoryProvider>
      <Container>
        <Navigation height={65} isFixed>
          <Logo />
          <Spacer variant="flex" />
          <Items>
            <PublishButton>Publish</PublishButton>
            <UserActionHeader />
          </Items>
        </Navigation>
        <main>{children}</main>
      </Container>
    </NewStoryProvider>
  );
}
