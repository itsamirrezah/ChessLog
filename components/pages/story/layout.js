import Container from "../../shared/layout/container";
import Navigation from "../../shared/nav/container";
import Spacer from "../../shared/dividers/spacer";
import Items from "../../shared/nav/items";
import UserActionHeader from "../../../features/user-actions-header/user-action-header";

export default function Layout({ children, authorDetailHeader }) {
  return (
    <Container>
      <Navigation height={115}>
        {authorDetailHeader}
        <Spacer variant="flex" />
        <Items>
          <UserActionHeader />
        </Items>
      </Navigation>
      <main>{children}</main>
    </Container>
  );
}
