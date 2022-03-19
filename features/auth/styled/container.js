import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 67.8rem;
  height: 200px;
  padding: 4.4rem 5.6rem;
  background: #ffffff;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 10px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  min-height: 695px;
  position: relative;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
