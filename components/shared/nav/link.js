import NextLink from "next/link";
import styled from "styled-components";

export default function Link({ href, children }) {
  return (
    <P>
      <NextLink href={href}>{children}</NextLink>
    </P>
  );
}

const P = styled.p`
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 400;
`;
