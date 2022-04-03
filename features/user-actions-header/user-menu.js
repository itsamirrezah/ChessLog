import Popup from "../popup/popup";
import Trigger from "../popup/trigger";
import Avatar from "../../components/shared/avatar/avatar";
import Pop from "../popup/pop";
import styled from "styled-components";
import Divider from "../../components/shared/dividers/line";
import Link from "next/link";
import { useState } from "react";
import useOutsideClick from "../../lib/hooks/use-outside-click";

export default function UserMenu({ signOut, user }) {
  const [menuShown, setMenuShown] = useState(false);
  const { ref } = useOutsideClick(() => setMenuShown(false));

  return (
    <Popup in={menuShown} ref={ref}>
      <Trigger onClick={() => setMenuShown((state) => !state)}>
        <Avatar src="/cover.jpg" size={28} />
      </Trigger>
      <Pop>
        <Container>
          <ul>
            <MenuItem>
              <Link href="/stories/new">New story</Link>
            </MenuItem>
            <MenuItem onClick={signOut}>Sign out</MenuItem>
          </ul>
          <Divider space="24" />

          <UserInfo>
            <Avatar src="/cover.jpg" size={32} />
            <div>
              <p>{user.name}</p>
              <p>{`@${user.username}` || user.email}</p>
            </div>
          </UserInfo>
        </Container>
      </Pop>
    </Popup>
  );
}

const UserInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 0 24px;
  & p:first-child {
    margin-bottom: 4px;
  }

  & p {
    color: rgb(41, 41, 41);
    font-size: 14px;
    line-height: 20px;
  }

  & p:last-child {
    font-size: 13px;
    font-weight: 200;
  }
`;

const Container = styled.div`
  margin: 20px 0;
`;

const MenuItem = styled.li`
  color: rgb(41, 41, 41);
  line-height: 20px;
  font-size: 14px;
  padding: 0 24px;
  margin: 12px 0;
  cursor: pointer;
`;
