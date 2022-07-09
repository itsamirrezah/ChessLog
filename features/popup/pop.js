import styled, { css } from "styled-components";

const anchors = ["left", "right", "top", "bottom"];
export default function Pop({
  children,
  position = "bottom",
  showAnchor = true,
}) {
  if (!anchors.includes(position)) throw new Error("wrong position");
  return (
    <Container position={position} showAnchor={showAnchor}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  /* top: 100%; */
  transform: translateX(-50%);
  /* left: 50%; */
  /* margin-top: 10px; */
  z-index: 1;

  ${({ showAnchor }) =>
    showAnchor &&
    css`
      &:after {
        content: "";
        position: absolute;
        /* bottom: 100%; */
        /* left: 50%; */
        /* transform: translateX(-50%); */
        border-width: 6px;
        border-style: solid;
        background-color: transparent;
      }
    `}

  ${({ position }) => positions[position]}
`;

const bottom = css`
  top: 100%;
  left: 50%;
  margin-top: 10px;

  ${({ showAnchor }) =>
    showAnchor &&
    css`
      &:after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: transparent transparent rgba(230, 230, 230, 0.6)
          transparent;
      }
    `}
`;

const left = css`
  right: 100%;
  top: 50%;
  margin-right: 10px;
  transform: translateY(-50%);
  ${({ showAnchor }) =>
    showAnchor &&
    css`
      &:after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-color: transparent transparent transparent
          rgba(230, 230, 230, 0.6);
      }
    `}
`;

const right = css`
  left: 100%;
  top: 50%;
  margin-left: 10px;
  transform: translateY(-50%);
  ${({ showAnchor }) =>
    showAnchor &&
    css`
      &:after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-color: transparent rgba(230, 230, 230, 0.6) transparent
          transparent;
      }
    `}
`;

const positions = {
  bottom,
  left,
  right,
};
