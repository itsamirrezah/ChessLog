import styled from "styled-components";
import Hidden from "../styles/hidden";

export default function Side({ children, gridColumn, ...props }) {
  return (
    <Container gridColumn={gridColumn} {...props}>
      <div>{children}</div>
    </Container>
  );
}
const Container = styled.div`
  grid-row-start: 1;
  grid-column: ${({ gridColumn, span }) => `${gridColumn} / span ${span}`};
  border-left: ${({ right }) => right && "1px solid rgb(230, 230, 230)"};
  border-right: ${({ left }) => left && "1px solid rgb(230, 230, 230)"};

  & > div {
    position: sticky;
    top: 3rem;
    padding: 0 20px;
    visibility: visible;
    opacity: 1;
    transition: all 0.5s;
    ${({ isHidden }) => isHidden && Hidden}

    & > div {
      margin-bottom: 40px;
    }
  }
`;
