import styled from "styled-components";
import Avatar from "../../components/shared/avatar/avatar";

export default function Item({ user }) {
  return (
    <ItemContainer>
      <Avatar size={20} src={user?.image || "/cover.jpg"} alt="alt" />
      <p>{user.username}</p>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  &:last-of-type {
    margin-bottom: 20px;
  }
`;
