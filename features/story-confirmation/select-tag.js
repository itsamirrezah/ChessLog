import Pop from "../popup/pop";
import Popup from "../popup/popup";
import Trigger from "../popup/trigger";
import EditableSpan from "../editable-span/editable-span";
import SearchTooltip from "./styled/search-tooltip";
import SearchItem from "./styled/search-item";

const dummy = [
  { id: 1, name: "Hello World in Flutter" },
  { id: 2, name: "What the Heck is" },
  { id: 3, name: "WhatsApp Tips And Tricks" },
  { id: 4, name: "Javascript" },
];

export default function SelectTag() {
  function onChange(e) {
    // setInput(e.target.textContent);
  }
  return (
    <Popup in={true} style={{ display: "inline-block" }}>
      <Trigger>
        <EditableSpan
          style={{
            background: "transparent",
            border: "hidden",
            outline: "none",
            "font-size": 15,
            color: "rgba(0, 0, 0, 0.68)",
            "line-height": 20,
          }}
          placeholder="Add a tag"
          onChange={onChange}
        />
      </Trigger>
      <Pop>
        <SearchTooltip>
          {dummy.map((it) => (
            <SearchItem key={it.id}>{it.name}</SearchItem>
          ))}
        </SearchTooltip>
      </Pop>
    </Popup>
  );
}
