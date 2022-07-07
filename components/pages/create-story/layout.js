import Container from "../../shared/layout/container";
import Navigation from "../../shared/nav/container";
import Logo from "../../shared/nav/logo";
import Spacer from "../../shared/dividers/spacer";
import PublishButton from "../../shared/buttons/publish-button";
import Items from "../../shared/nav/items";
import useCreateStory from "../../../features/create-story/context/new-story-context";
import UserActionHeader from "../../../features/user-actions-header/user-action-header";
import { useState } from "react";
import ConfirmationModal from "../../../features/story-confirmation/confirmation-modal";

export default function Layout({ children }) {
  const { enabled, dispatch, onPublishHandler, story } = useCreateStory();
  const [isModalShown, setModalShown] = useState();

  return (
    <Container>
      <Navigation height={65} isFixed>
        <Logo />
        <Spacer variant="flex" />
        <Items>
          <PublishButton
            disabled={!enabled}
            onClick={() => setModalShown(true)}
          >
            Publish
          </PublishButton>
          <UserActionHeader />
        </Items>
      </Navigation>
      <main>{children}</main>
      {isModalShown && (
        <ConfirmationModal
          onClose={() => setModalShown(false)}
          onConfirmPublish={onPublishHandler}
          dispatch={dispatch}
          story={story}
        />
      )}
    </Container>
  );
}
