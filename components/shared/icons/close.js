import { FaTimes } from "react-icons/fa";

import Icon from "./icon";

export default function IconClap({ onClick }) {
  return (
    <Icon onClick={onClick}>
      <FaTimes />
    </Icon>
  );
}
