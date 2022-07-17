import { useState } from "react";
import TextButton from "../../components/shared/buttons/text-button";
import SideHeader from "../../components/shared/sidebars/sidebar-header";
import useUserRelations from "../../lib/services/user-relations";
import AuthorFollowModal from "../author-follow-modal/author-follow-modal";
import Item from "./item";
export default function AuthorFollowingSideBar({ authorId }) {
  const [isShowingModal, setShowingModal] = useState(false);
  const { data: allPages } = useUserRelations(authorId, true, 1);

  const page = allPages?.pages[0];
  if (!page || page?.metadata.total === 0) return null;
  return (
    <div>
      <SideHeader>Following</SideHeader>
      {page.users.map((u) => (
        <Item key={u._id} user={u} />
      ))}
      <TextButton
        color="#1a8a17"
        onClick={() => setShowingModal(true)}
      >{`See all (${page.metadata.total})`}</TextButton>
      {isShowingModal && (
        <AuthorFollowModal
          authorId={authorId}
          isFollowing={true}
          onClose={() => setShowingModal(false)}
        />
      )}
    </div>
  );
}
