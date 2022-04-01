import { Children } from "react";
import useAuth from "../../../lib/context/auth-context";

// { Component, onClick, ...rest, children }
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
  // return (
  //   <Component
  //     onClick={isSessionLoading ? null : !isAuth ? showModal : onClick}
  //     {...rest}
  //   />
  // );
}
