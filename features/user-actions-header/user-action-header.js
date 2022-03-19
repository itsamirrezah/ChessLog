import Avatar from "../../components/shared/avatar/avatar";
import GettingStartedButton from "../../components/shared/buttons/getting-started-button";
import useAuth from "../../lib/context/auth-context";

export default function UserActionHeader() {
  const { isSessionLoading, isAuth, showModal, signOut } = useAuth();

  return (
    <>
      {!isAuth && !isSessionLoading && (
        <GettingStartedButton variant="green" onClick={showModal}>
          Get Started
        </GettingStartedButton>
      )}
      {isAuth && <Avatar src="/cover.jpg" size={28} />}
      {isAuth && <button onClick={signOut}>logout</button>}
    </>
  );
}
