import styled from "styled-components";

export default function Dot() {
  return (
    <Container>
      <span>.</span>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 0.6rem;
  color: #757575;
  font-size: 1.4rem;
  position: relative;
  top: -2px;
  font-family: sans-serif;
  font-weight: 600;
`;
