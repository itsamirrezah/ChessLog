import GettingStartedButton from "../../components/shared/buttons/getting-started-button";
import useAuth from "../../lib/context/auth-context";
import UserMenu from "./user-menu";
export default function UserActionHeader() {
  const { isSessionLoading, isAuth, showModal, signOut, user } = useAuth();

  return (
    <>
      {!isAuth && !isSessionLoading && (
        <GettingStartedButton variant="green" onClick={showModal}>
          Get Started
        </GettingStartedButton>
      )}
      {isAuth && <UserMenu signOut={signOut} user={user} />}
    </>
  );
}
