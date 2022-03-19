import styled from "styled-components";
import Image from "next/image";

export default function FallbackTimeline() {
  return (
    <Container>
      <Image src="/charco-pet.png" width={400} height={400} alt="no state" />
      <h2>No Timeline!</h2>
      <span>
        There is no story in your timeline. try following authors to see more
        content.
      </span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
