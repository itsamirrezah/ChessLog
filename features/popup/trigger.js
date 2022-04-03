import styled from "styled-components";

export default function Trigger({ children, onClick }) {
  return <Container onClick={onClick}>{children}</Container>;
}

const Container = styled.div`
  cursor: pointer;
`;
