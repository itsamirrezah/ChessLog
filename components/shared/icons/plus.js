AiOutlinePlusCircle;

import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Icon from "./icon";

export default function IconPlus({ onClick, isPlus }) {
  return (
    <Icon onClick={onClick} style={{ fontSize: 32, color: "rgba(0,0,0,.60)" }}>
      {isPlus && <AiOutlinePlusCircle />}
      {!isPlus && <AiOutlineCloseCircle />}
    </Icon>
  );
}
