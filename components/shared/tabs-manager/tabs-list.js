import React from "react";
import styled, { css } from "styled-components";

export default function TabsList(props) {
  const children = React.Children.toArray(props.children);
  const { onClick, selectedIndex } = props;
  return (
    <Container>
      {children.map((child, index) => (
        <child.type
          key={index}
          onClick={() => onClick(index)}
          isSelected={selectedIndex === index}
          {...child.props}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
`;

export const TabItem = styled.div`
  cursor: pointer;
  color: rgba(117, 117, 117, 1);
  line-height: 32px;
  font-size: 14px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      box-shadow: rgb(230 230 230) 0px -1px 0px inset;
      color: rgba(41, 41, 41, 1);
    `}
`;
