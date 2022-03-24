import { forwardRef } from "react";
import styled, { css } from "styled-components";

export default forwardRef(function Navigation(
  { height, isFixed, isHeroVisible, children },
  ref
) {
  return (
    <>
      <Container
        height={height}
        isFixed={isFixed}
        isHeroVisible={isHeroVisible}
        ref={ref}
      >
        <div>
          <div>{children}</div>
        </div>
      </Container>
      {isFixed && <div style={{ height: height }}></div>}
    </>
  );
});

const Fixed = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid rgb(150, 150, 150);
  color: #000;
  height: ${(props) => `${props.height}px`};
  transition: background-color 0.8s;
  ${({ isFixed }) => isFixed && Fixed}

  ${({ isHeroVisible }) =>
    isHeroVisible &&
    css`
      background-color: #ffc017;
      border-color: #000;
    `}

  & > div {
    max-width: 1192px;
    width: 100%;
    margin: auto 0;

    & > div {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
`;
