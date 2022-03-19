/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import useAspectRatio from "../../../lib/hooks/use-aspect-ratio";

export default function AspectImage({ ...props }) {
  const { ref, onImageLoad, ratio, width } = useAspectRatio();
  return (
    <Container w={width}>
      <Extender height={ratio} />
      <img onLoad={onImageLoad} ref={ref} {...props} />
    </Container>
  );
}

const Extender = styled.div`
  padding-bottom: ${(props) => `${props.height}%`};
`;

const Container = styled.div`
  position: relative;
  max-width: 700px;
  width: ${(props) => `${props.w}px`};
  height: auto;
  margin: 0 auto;

  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;
