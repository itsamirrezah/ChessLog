import styled from "styled-components";

export default function Tooltip({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgb(230, 230, 230);
  border: 1px solid rgb(230, 230, 230);
`;
