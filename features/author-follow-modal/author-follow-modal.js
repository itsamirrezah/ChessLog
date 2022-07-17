import { useEffect, useState } from "react";
import Modal from "../../components/shared/modals/modal";
import AuthorFollow from "./author-follow";

export default function AuthorFollowModal({ authorId, isFollowing, onClose }) {
  return (
    <Modal>
      <AuthorFollow
        userId={authorId}
        isFollowing={isFollowing}
        onClose={onClose}
      />
    </Modal>
  );
}
