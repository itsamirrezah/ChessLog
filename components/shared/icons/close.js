import { FaTimes } from "react-icons/fa";

import Icon from "./icon";

export default function IconClose({ onClick }) {
  return (
    <Icon onClick={onClick}>
      <FaTimes />
    </Icon>
  );
}
