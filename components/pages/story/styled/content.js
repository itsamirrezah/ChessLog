import styled from "styled-components";

export default function Content({ children }) {
  return (
    <StyledContent>
      <div>{children}</div>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  border-left: 1px solid rgba(117, 117, 177, 0.5);
  border-right: 1px solid rgba(117, 117, 177, 0.5);

  & > div {
    padding-top: 5.6rem;
    max-width: 692px;
    width: 100%;
    margin: 0 auto;
  }
`;
