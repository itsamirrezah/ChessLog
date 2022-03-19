import Navigation from "../../shared/nav/container";
import Logo from "../../shared/nav/logo";
import Spacer from "../../shared/dividers/spacer";
import Items from "../../shared/nav/items";
import Container from "../../shared/layout/container";
import Hero from "../../shared/hero/hero";
import useIntersection from "../../../lib/hooks/use-intersection";
import UserActionHeader from "../../../features/user-actions-header/user-action-header";

export default function Layout({ user, children }) {
  const { isIntersecting, ref } = useIntersection(0.2);

  return (
    <Container>
      <Navigation height={75} isFixed={!user} isHeroVisible={isIntersecting}>
        <Logo />
        <Spacer variant="flex" />
        <Items>
          <UserActionHeader />
        </Items>
      </Navigation>
      {!user && <Hero ref={ref} />}
      <main>{children}</main>
    </Container>
  );
}
