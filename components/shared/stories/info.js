import styled from "styled-components";
import DotDivider from "../dividers/dot";
import Text from "./styled/text";

export default function Info() {
  return (
    <Container>
      <Text>Jan 16</Text>
      <DotDivider />
      <Text>6 min read</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;
