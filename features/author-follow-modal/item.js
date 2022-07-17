import styled from "styled-components";
import Avatar from "../../components/shared/avatar/avatar";
import FollowButton from "../../components/shared/buttons/follow-button";
import Spacer from "../../components/shared/dividers/spacer";
import AuthProtected from "../../components/shared/wrapper/auth-protected";
import H2 from "../who-to-follow/styled/h2";
import About from "../author-detail-sidebar/styled/about";
import Container from "./styled/item";

export default function Item({ user }) {
  return (
    <Container>
      <Avatar size={44} alt="alt" src="/cover.jpg" />
      <AuthorInfo>
        <H2>{user.name}</H2>
        <ItemAbout>{user?.about}</ItemAbout>
      </AuthorInfo>
      <Spacer variant="flex" />
      <AuthProtected>
        <FollowButton>Follow</FollowButton>
      </AuthProtected>
    </Container>
  );
}

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
`;

const ItemAbout = styled(About)`
  margin: 0;
`;
