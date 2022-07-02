import styled from "styled-components";
import TagItem from "./tag-item";
import SelectTag from "./select-tag";
export default function AddTags() {
  return (
    <Container>
      <TagItem>Hello</TagItem>
      <TagItem>World</TagItem>
      <TagItem>World</TagItem>
      <TagItem>World</TagItem>
      <TagItem>Hello World in Flutter And its Easy</TagItem>
      <TagItem>World</TagItem>
      <TagItem>World</TagItem>
      <TagItem>World</TagItem>
      <SelectTag />
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
