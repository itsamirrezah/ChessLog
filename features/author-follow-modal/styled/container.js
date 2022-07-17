import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-top: 48px;
  gap: 10px;
  position: relative;
  overflow: scroll;
  padding-bottom: 16px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
