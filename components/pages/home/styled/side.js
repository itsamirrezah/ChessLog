import styled from "styled-components";

export default function Side({ children }) {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  );
}
const Container = styled.div`
  grid-row-start: 1;
  grid-column: 9 / span 4;
  border-left: 1px solid rgb(230, 230, 230);

  & > div {
    position: sticky;
    top: 3rem;
    padding: 0 20px;

    & > div {
      margin-bottom: 40px;
    }
  }
`;
