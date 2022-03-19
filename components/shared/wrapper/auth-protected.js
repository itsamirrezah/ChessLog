import useAuth from "../../../lib/context/auth-context";

export default function AuthProtected({ Component, onClick, ...rest }) {
  const { showModal, isAuth, isSessionLoading } = useAuth();

  return (
    <Component
      onClick={isSessionLoading ? null : !isAuth ? showModal : onClick}
      {...rest}
    />
  );
}
