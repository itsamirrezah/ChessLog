import { createPortal } from "react-dom";
import styled from "styled-components";

export default function Modal({ children }) {
  return createPortal(
    <Container>
      <div>{children}</div>
    </Container>,
    document.getElementById("modal")
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background-color: green;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);

  & > div {
    width: 67.8rem;
    height: 200px;
    background: #ffffff;
    box-shadow: rgb(0 0 0 / 15%) 0px 2px 10px;
    border-radius: 5px;
    min-height: 695px;
    position: relative;
  }
`;
