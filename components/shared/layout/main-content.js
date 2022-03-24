import styled from "styled-components";
import Grid from "../styles/grid";

export default function MainPage({ children, width, grid }) {
  return (
    <StyledContainer grid={grid} width={width}>
      <div>{children}</div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  /* FIXME: remove padding */
  padding: 6.4rem 0;

  & > div {
    width: 100%;
    max-width: ${({ width }) => `${width}px`};
    ${({ grid }) => grid && Grid}
  }
`;
