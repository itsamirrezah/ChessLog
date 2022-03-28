import AuthButton from "./styled/auth-button";
import SwitchAuth from "./styled/switch-auth";
import SwitchButton from "./styled/switch-button";
import Header from "../../components/shared/modals/styled/header";
import { useState } from "react";
import SignWithEmail from "./sign-with-email";
import useAuth from "../../lib/context/auth-context";

export default function SignIn({ onSwitch }) {
  const [isSignIn, setSignIn] = useState(false);
  const { signIn, isLoading, error } = useAuth();

  return (
    <>
      {!isSignIn && (
        <>
          <Header>Welcome Back.</Header>
          <AuthButton onClick={() => setSignIn(true)}>
            Sign in with email
          </AuthButton>
          <SwitchAuth>
            No Account?{" "}
            <SwitchButton onClick={onSwitch}>Create one</SwitchButton>
          </SwitchAuth>
        </>
      )}
      {isSignIn && (
        <SignWithEmail
          onBack={() => {
            setSignIn(false);
          }}
          sign="in"
          onNext={signIn}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
}
