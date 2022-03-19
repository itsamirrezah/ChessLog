import styled from "styled-components";

export default function Container({ children }) {
  return (
    <StyledContainer>
      <div>{children}</div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 6.4rem 0;

  & > div {
    max-width: 1192px;
    display: grid;
    grid-template-columns: repeat(8, 1fr) repeat(4, minmax(48px, 1fr));
    grid-template-rows: 1fr;
    width: 100%;
  }
`;
