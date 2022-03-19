import styled, { css } from "styled-components";

const green = css`
  background-color: #1a8917;
  padding: 0.7rem 1.6rem;
  border: 1px solid #1a8917;
  font-size: 1.4rem;
  color: #fff;
  transition: background-color 0.1s;

  &:hover {
    background-color: rgb(15, 115, 12);
  }
`;

const grey = css`
  padding: 0.7rem 2rem;
  font-size: 1.6rem;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
`;
export default styled.button`
  line-height: 2.4rem;
  border-radius: 99em;

  ${({ variant }) => variants[variant] || grey}
`;

const variants = { green, grey };
