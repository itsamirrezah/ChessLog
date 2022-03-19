import { useState } from "react";
import Container from "./styled/container";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import CloseIcon from "../../components/shared/icons/close";
import CloseContainer from "./styled/close-container";

export default function Auth({ hide, isClosable }) {
  const [signOption, setSignOption] = useState(options.login);

  return (
    <Container>
      {signOption === options.login && (
        <SignIn onSwitch={() => setSignOption(options.signup)} />
      )}
      {signOption === options.signup && (
        <SignUp onSwitch={() => setSignOption(options.login)} />
      )}
      {isClosable && (
        <CloseContainer>
          <CloseIcon onClick={hide} />
        </CloseContainer>
      )}
    </Container>
  );
}

const options = Object.freeze({
  login: "login",
  signup: "signup",
});
