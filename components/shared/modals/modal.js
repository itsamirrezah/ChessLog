import { createPortal } from "react-dom";
import styled from "styled-components";

export default function Modal({ children }) {
  return createPortal(
    <Container>{children}</Container>,
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
`;
