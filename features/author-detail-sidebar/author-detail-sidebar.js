import Avatar from "../../components/shared/avatar/avatar";
import H2 from "./styled/h2";
import Followers from "./styled/followers";
import About from "./styled/about";
import FollowButton from "../../components/shared/buttons/follow-button";
import Container from "./styled/container";
import useUser from "../../lib/services/user";
import useViewerEdgeUser from "../../lib/services/viewer-edge-user";
import AuthProtected from "../../components/shared/wrapper/auth-protected";
import useFollowUser from "../../lib/services/follow-user";
import AuthorFollowModal from "../author-follow-modal/author-follow-modal";
import { useState } from "react";

export default function AuthorDetail({ author }) {
  const [isShowingModal, setShowingModal] = useState(false);
  const { data: authorInfo } = useUser(author);
  const { data: viewerEdge } = useViewerEdgeUser(author._id);
  const { mutate } = useFollowUser(author._id, viewerEdge?.isViewerFollow);
  return (
    <Container>
      <Avatar size={88} alt="alt" src="/cover.jpg" />
      <H2>{authorInfo?.name}</H2>
      {authorInfo && authorInfo.followers && (
        <Followers
          onClick={() => setShowingModal(true)}
        >{`${authorInfo.followers} Followers`}</Followers>
      )}
      <About>{authorInfo?.about}</About>
      {viewerEdge && viewerEdge?.isAllowed && (
        <AuthProtected>
          <FollowButton
            variant="green"
            isFollow={viewerEdge.isViewerFollow}
            onClick={() => mutate(author._id)}
          >
            {viewerEdge.isViewerFollow ? "Following" : "Follow"}
          </FollowButton>
        </AuthProtected>
      )}
      {isShowingModal && (
        <AuthorFollowModal
          isFollowing={false}
          authorId={author._id}
          onClose={() => setShowingModal(false)}
        />
      )}
    </Container>
  );
}
