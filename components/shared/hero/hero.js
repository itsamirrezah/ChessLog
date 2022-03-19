import { forwardRef } from "react";
import useAuth from "../../../lib/context/auth-context";
import Container from "./styled/container";
import Background from "./styled/background";
import Content from "./styled/content";
import GettingStartedButton from "../buttons/getting-started-button";

export default forwardRef(function Hero(_, ref) {
  const { showModal } = useAuth();
  return (
    <Container ref={ref}>
      <Background />
      <Content>
        <h2>It&apos;s is place to write, read, and connect</h2>
        <h3>
          It&apos;s easy and free to post your thinking on any topic and connect
          with millions of readers.
        </h3>
        <GettingStartedButton onClick={showModal}>
          Start Writing
        </GettingStartedButton>
      </Content>
    </Container>
  );
});
