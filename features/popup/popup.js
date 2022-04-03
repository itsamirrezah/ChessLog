import { Children, forwardRef } from "react";
import styled from "styled-components";
import Pop from "./pop";

export default forwardRef(function Popup(props, ref) {
  const children = Children.toArray(props.children);

  return (
    <Container ref={ref}>
      {children.map((child) => {
        if (child.type.name === Pop.name && !props.in) return;
        else return child;
      })}
    </Container>
  );
});

const Container = styled.div`
  position: relative;
`;

/**
 * <Popup in={state} anchor="top/left/right/bottom">
 *    <Trigger> trigger by me </Trigger>
 *    <Pop> pop up </Pop>
 * </Popup>
 */
