import styled from "styled-components";

export default function TagItem({ children }) {
  return <Container>{children}</Container>;
}
const Container = styled.button`
  background-color: #fff;
  color: #000;
  padding: 5px 10px;
  border: 1px solid #f0f0f0;
  margin-right: 4px;
  display: inline-block;
  cursor: pointer;
`;
