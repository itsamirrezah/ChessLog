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

export default function AuthorDetail({ author }) {
  const { data: authorInfo } = useUser(author);
  const { data: viewerEdge } = useViewerEdgeUser(author._id);
  const { mutate } = useFollowUser(author._id, viewerEdge?.isViewerFollow);

  return (
    <Container>
      <Avatar size={88} alt="alt" src="/cover.jpg" />
      <H2>{authorInfo?.name}</H2>
      {authorInfo && authorInfo.followers && (
        <Followers>{`${authorInfo.followers} Followers`}</Followers>
      )}
      <About>{authorInfo?.about}</About>
      {viewerEdge && viewerEdge?.isAllowed && (
        <AuthProtected
          Component={FollowButton}
          variant="green"
          isFollow={viewerEdge.isViewerFollow}
          onClick={() => mutate(author._id)}
        >
          {viewerEdge.isViewerFollow ? "Following" : "Follow"}
        </AuthProtected>
      )}
    </Container>
  );
}
