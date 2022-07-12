import React from "react";
import styled from "styled-components";

export default function TabsList(props) {
  const children = React.Children.toArray(props.children);
  const { onClick, selectedIndex } = props;
  return (
    <Container>
      {children.map((child, index) => (
        <TabItem key={index} onClick={() => onClick(index)}>
          {child}
        </TabItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TabItem = styled.div`
  cursor: pointer;
`;
