import Auth from "../../../features/auth/auth";
import Container from "./styled/container";

export default function SignInPage() {
  return (
    <Container>
      <Auth isClosable={false} />
    </Container>
  );
}
