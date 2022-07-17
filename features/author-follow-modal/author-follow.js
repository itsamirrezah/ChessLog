import { Fragment } from "react";
import FollowButton from "../../components/shared/buttons/follow-button";
import IconClose from "../../components/shared/icons/close";
import Header from "../../components/shared/modals/styled/header";
import useUserRelations from "../../lib/services/user-relations";
import CloseContainer from "../auth/styled/close-container";
import List from "./styled/list";
import Item from "./item";
import Container from "./styled/container";

export default function AuthorFollow({ userId, isFollowing, onClose }) {
  const { data, fetchNextPage, hasNextPage } = useUserRelations(
    userId,
    isFollowing,
    1
  );

  if (!data?.pages) return null;

  return (
    <Container>
      <Header>
        {data.pages[0].metadata.total} {isFollowing ? "Following" : "Followers"}
      </Header>
      <List>
        {data.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.users.map((u) => (
                <Item key={u._id} user={u} />
              ))}
            </Fragment>
          );
        })}
      </List>
      {hasNextPage && (
        <FollowButton onClick={fetchNextPage}>Show more</FollowButton>
      )}
      <CloseContainer>
        <IconClose onClick={onClose} />
      </CloseContainer>
    </Container>
  );
}
