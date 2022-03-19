import useFollowUser from "../../lib/services/follow-user";
import Avatar from "../../components/shared/avatar/avatar";
import FollowButton from "../../components/shared/buttons/follow-button";
import Main from "./styled/main";
import H2 from "./styled/h2";
import P from "./styled/p";
import Container from "./styled/item";
import AuthProtected from "../../components/shared/wrapper/auth-protected";

export default function Item({ author }) {
  const { mutate, isError } = useFollowUser(author._id, author.isFollowed);

  return (
    <Container>
      <Avatar src="/cover.jpg" alt={author.name} size={48} />
      <Main>
        <H2>{author.name}</H2>
        <P>{author.about}</P>
      </Main>
      <AuthProtected
        Component={FollowButton}
        onClick={() => mutate(author._id)}
      >
        {isError ? "Error!" : author.isFollowed ? "Following" : "Follow"}
      </AuthProtected>
    </Container>
  );
}
