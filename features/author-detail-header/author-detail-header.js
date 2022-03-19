import Link from "../../components/shared/nav/link";
import FollowButton from "../../components/shared/buttons/follow-button";
import abbreviatedNumber from "../../lib/utils/abbreviated-number";
import TextButton from "../../components/shared/buttons/text-button";
import Logo from "../../components/shared/nav/logo";
import Items from "../../components/shared/nav/items";
import useUser from "../../lib/services/user";
import useViewerEdgeUser from "../../lib/services/viewer-edge-user";
import AuthProtected from "../../components/shared/wrapper/auth-protected";
import useFollowUser from "../../lib/services/follow-user";

export default function AuthorDetailHeader({ author }) {
  const { data: authorInfo } = useUser(author);
  const { data: viewerEdge } = useViewerEdgeUser(author._id);
  const { mutate } = useFollowUser(author._id, viewerEdge?.isViewerFollow);

  return (
    <>
      <Logo href={`/`}>{authorInfo?.name}</Logo>
      <Items>
        {/* TODO: followers modal */}
        {authorInfo && authorInfo.followers && (
          <TextButton>{`${abbreviatedNumber(
            authorInfo.followers
          )} Followers`}</TextButton>
        )}
        <TextButton>
          <Link href="/test.com">About</Link>
        </TextButton>
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
      </Items>
    </>
  );
}
