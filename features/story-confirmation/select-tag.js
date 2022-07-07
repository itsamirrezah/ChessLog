import Pop from "../popup/pop";
import Popup from "../popup/popup";
import Trigger from "../popup/trigger";
import SearchTooltip from "./styled/search-tooltip";
import SearchItem from "./styled/search-item";
import { useRef, useState } from "react";
import EditableSpan from "../editable-span/editable-span";
import useSearchTag from "../../lib/services/search-tag";

export default function SelectTag({ selectedTags, addTag }) {
  const [searchTag, setSearchTag] = useState("");
  const { data, isError, isSuccess } = useSearchTag(searchTag);
  const ref = useRef();

  function addTagHandler(tag) {
    addTag(tag);
    ref.current.textContent = "";
    setSearchTag("");
  }
  function onChange(e) {
    const input = e.target.textContent;
    setSearchTag(input);
    if (input.charAt(input.length - 1) === ",") {
      const tag = input.substring(0, input.length - 1);
      addTagHandler(tag);
    }
  }
  return (
    <Popup in={!!data} style={{ display: "inline-block" }}>
      <Trigger>
        <EditableSpan
          ref={ref}
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
          {data &&
            data.map(
              (it) =>
                !selectedTags.includes(it.name) && (
                  <SearchItem
                    key={it._id}
                    onClick={() => addTagHandler(it.name)}
                  >
                    {it.name}
                  </SearchItem>
                )
            )}
        </SearchTooltip>
      </Pop>
    </Popup>
  );
}
