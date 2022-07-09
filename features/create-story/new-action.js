import Popup from "../popup/popup";
import Trigger from "../popup/trigger";
import Pop from "../popup/pop";
import IconPlus from "../../components/shared/icons/plus";
import { useRef, useState } from "react";
import IconCamera from "../../components/shared/icons/camera";
import Input from "../../components/shared/input/input";

export default function NewAction({ onAddImageHandler }) {
  const [isOpen, setOpen] = useState(false);
  const inputRef = useRef();
  return (
    <Popup in={isOpen}>
      <Trigger>
        <IconPlus isPlus={!isOpen} onClick={() => setOpen((state) => !state)} />
      </Trigger>
      <Pop position="right" showAnchor={false}>
        <div /* flex row */>
          <Input
            inputRef={inputRef}
            onChange={(e) => onAddImageHandler(e.target.files.item(0))}
          >
            <IconCamera onClick={() => inputRef.current.click()} />
          </Input>
        </div>
      </Pop>
    </Popup>
  );
}
