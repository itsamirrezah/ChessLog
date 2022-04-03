import { Children } from "react";
import useAuth from "../../../lib/context/auth-context";

export default function AuthProtected(props) {
  const { showModal, isAuth, isSessionLoading } = useAuth();

  const children = Children.only(props.children);

  return (
    <children.type
      {...children.props}
      onClick={
        isSessionLoading ? null : !isAuth ? showModal : children.props?.onClick
      }
    />
  );
}
