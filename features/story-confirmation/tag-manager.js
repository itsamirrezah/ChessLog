import styled from "styled-components";
import TagItem from "./tag-item";
import SelectTag from "./select-tag";
import { useState } from "react";

export default function TagManager({ selectedTags, setSelectedTags }) {
  const [tagSelected, setTagSelected] = useState("");
  function addTagHandler(tag) {
    if (selectedTags.includes(tag)) return;
    setSelectedTags((prev) => {
      const state = prev || selectedTags;
      return [...state, tag];
    });
  }

  function removeTagHandler(tag) {
    setSelectedTags((prev) => {
      const state = prev || selectedTags;
      return state.filter((it) => it !== tag);
    });
    if (tag !== tagSelected) return;
    setTagSelected("");
  }

  return (
    <Container>
      {selectedTags.map((it) => (
        <TagItem
          key={it}
          removeTag={() => removeTagHandler(it)}
          isSelected={it === tagSelected}
          setSelected={() => setTagSelected(it)}
        >
          {it}
        </TagItem>
      ))}
      <SelectTag selectedTags={selectedTags} addTag={addTagHandler} />
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 6px 10px;
  width: 100%;
  background-color: rgb(250, 250, 250);
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  row-gap: 4px;
  align-items: center;
`;
