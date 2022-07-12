import Navigation from "../../shared/nav/container";
import Logo from "../../shared/nav/logo";
import Spacer from "../../shared/dividers/spacer";
import Items from "../../shared/nav/items";
import Container from "../../shared/layout/container";
import UserActionHeader from "../../../features/user-actions-header/user-action-header";
export default function Layout({ children }) {
  return (
    <Container>
      <Navigation height={75} isFixed={false} isHeroVisible={false}>
        <Logo>Amirreza's Blog</Logo>
        <Spacer variant="flex" />
        <Items>
          <UserActionHeader />
        </Items>
      </Navigation>
      <main>{children}</main>
    </Container>
  );
}
