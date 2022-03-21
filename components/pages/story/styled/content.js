import styled from "styled-components";

export default function Content({ children }) {
  return (
    <StyledContent>
      <div>{children}</div>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  grid-row-start: 1;
  grid-column: 3 / span 7;

  & > div {
    padding-top: 5.6rem;
    max-width: 692px;
    width: 100%;
    margin: 0 auto;
  }
`;
