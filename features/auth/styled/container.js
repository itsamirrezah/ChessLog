import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.4rem 5.6rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
