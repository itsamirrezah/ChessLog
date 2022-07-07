import Modal from "../../components/shared/modals/modal";
import { useState, useEffect } from "react";
import ConfirmationStory from "./story-confirmation";

export default function ConfirmationModal({
  onClose,
  onConfirmPublish,
  story,
}) {
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    if (!isShown) setShown(true);
  }, []);
  return (
    isShown && (
      <Modal>
        <ConfirmationStory
          onClose={onClose}
          onConfirmPublish={onConfirmPublish}
          story={story}
        />
      </Modal>
    )
  );
}
