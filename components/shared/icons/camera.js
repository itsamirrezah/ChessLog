import { AiOutlineCamera } from "react-icons/ai";
import Icon from "./icon";

export default function IconCamera({ onClick }) {
  return (
    <Icon onClick={onClick} style={{ fontSize: 24, color: "rgba(0,0,0,.60)" }}>
      <AiOutlineCamera />
    </Icon>
  );
}
