import Link from "next/link";
import styled from "styled-components";

export default function Logo({ href, children }) {
  return (
    <H1>
      <Link href={href || "/"} passHref>
        {children || "SocialBlog"}
      </Link>
    </H1>
  );
}

const H1 = styled.h1`
  font-size: 32px;
  color: black;
`;
