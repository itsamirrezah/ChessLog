import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import Icon from "./icon";

const sizeVariants = {
  md: 20,
  lg: 28,
};

export default function IconClap({ isFill, size, onClick }) {
  return (
    <Icon style={{ fontSize: sizeVariants[size] || 20 }} onClick={onClick}>
      {isFill ? <FaThumbsUp /> : <FaRegThumbsUp />}
    </Icon>
  );
}
