import styled, { css } from "styled-components";

export default function TagItem({
  children,
  removeTag,
  isSelected,
  setSelected,
}) {
  function onClickHandler(e) {
    e.preventDefault();
    if (!isSelected) setSelected(true);
    else removeTag();
  }
  return (
    <Container onClick={onClickHandler} isSelected={isSelected}>
      {children}
    </Container>
  );
}
const Container = styled.button`
  background-color: #fff;
  color: #000;
  padding: 5px 10px;
  border: 1px solid #f0f0f0;
  margin-right: 4px;
  display: inline-block;
  cursor: pointer;

  &:hover {
    border-color: rgba(0, 0, 0, 0.3);
  }

  ${({ isSelected }) => isSelected && isSelectedStyled}
`;

const isSelectedStyled = css`
  background-color: green;
  color: #ffffff;
`;
