import styled from "styled-components";

export default function Container({ children }) {
  return (
    <StyledContainer>
      <div>{children}</div>
    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  & > div {
    max-width: 740px;
    margin: 32px auto;
  }
`;
