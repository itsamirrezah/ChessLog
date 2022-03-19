import { FaRegComment } from "react-icons/fa";
import Icon from "./icon";

const sizeVariants = {
  md: 20,
  lg: 28,
};

export default function IconComment({ size, onClick }) {
  return (
    <Icon style={{ fontSize: sizeVariants[size] || 20 }} onClick={onClick}>
      <FaRegComment />
    </Icon>
  );
}
