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
  margin-top: 6.4rem;
  & > div {
    max-width: 1504px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr;
    width: 100%;
  }
`;
