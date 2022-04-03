import styled from "styled-components";

export default function Pop({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgb(230, 230, 230);
  margin-top: 10px;
  z-index: 1;
  border: 1px solid rgb(230, 230, 230);

  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    background-color: #fff;
    border-color: transparent transparent rgb(230, 230, 230) transparent;
  }
`;
