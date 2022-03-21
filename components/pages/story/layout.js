import Container from "../../shared/layout/container";
import Navigation from "../../shared/nav/container";
import Spacer from "../../shared/dividers/spacer";
import Items from "../../shared/nav/items";
import UserActionHeader from "../../../features/user-actions-header/user-action-header";
import useIntersection from "../../../lib/hooks/use-intersection";
import { useEffect } from "react";

export default function Layout({ children, authorDetailHeader, handler }) {
  const { ref, isIntersecting } = useIntersection(0);

  useEffect(() => {
    if (!isIntersecting) handler(true);
    else handler(false);
  }, [isIntersecting, handler]);

  return (
    <Container>
      <Navigation height={115} ref={ref}>
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
