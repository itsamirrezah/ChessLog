import styled, { css } from "styled-components";
import NextImage from "next/image";

export default function Image({ variant, width, height, className, ...props }) {
  return (
    <Container
      variant={variant}
      width={width}
      height={height}
      className={className}
    >
      <NextImage {...props} layout="fill"></NextImage>
    </Container>
  );
}

const circle = css`
  border-radius: 50%;
  overflow: hidden;
`;

const rectangle = css``;

const variants = { circle, rectangle };

export const Container = styled.div`
  position: relative;

  ${({ variant }) => variants[variant] || rectangle}
`;
