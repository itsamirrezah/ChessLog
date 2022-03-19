import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Icon from "./icon";

const sizeVariants = {
  md: 20,
  lg: 28,
};

export default function IconBookmark({ isFill, size, onClick }) {
  return (
    <Icon style={{ fontSize: sizeVariants[size] || 20 }} onClick={onClick}>
      {!isFill ? <FaRegBookmark /> : <FaBookmark />}
    </Icon>
  );
}
