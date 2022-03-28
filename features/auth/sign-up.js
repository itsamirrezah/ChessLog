import AuthButton from "./styled/auth-button";
import SwitchAuth from "./styled/switch-auth";
import SwitchButton from "./styled/switch-button";
import { useState } from "react";
import SignWithEmail from "./sign-with-email";
import Header from "../../components/shared/modals/styled/header";
import useAuth from "../../lib/context/auth-context";

export default function SignUp({ onSwitch }) {
  const [isSignup, setSignUp] = useState(false);
  const { signUp, isLoading, error } = useAuth();

  return (
    <>
      {!isSignup && (
        <>
          <Header>Join Medium.</Header>
          <AuthButton onClick={() => setSignUp(true)}>
            Sign up with email
          </AuthButton>
          <SwitchAuth>
            Already have an account?
            <SwitchButton onClick={onSwitch}>Sign in</SwitchButton>
          </SwitchAuth>
        </>
      )}
      {isSignup && (
        <SignWithEmail
          onBack={() => setSignUp(false)}
          sign="up"
          onNext={signUp}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
}
