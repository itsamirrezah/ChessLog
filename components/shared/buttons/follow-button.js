import styled, { css } from "styled-components";

const green = css`
  background-color: #1a8917;
  padding: 0.7rem 1.6rem;
  color: #fff;
  border: 1px solid #1a8917;
  line-height: 2.4rem;

  ${({ isFollow }) =>
    isFollow &&
    css`
      border-color: rgb(26, 137, 23);
      color: rgb(26, 137, 23);
      background-color: #fff;
      border-width: 1px;
    `}
`;

const grey = css`
  border: 1px solid rgb(117, 117, 117);
  padding: 4px 12px 6px;
  line-height: 20px;
  &:hover {
    border-color: rgb(41, 41, 41);
  }
`;

export default styled.button`
  border-radius: 99em;
  font-size: 1.4rem;

  ${({ variant }) => variants[variant] || grey}
`;

const variants = { green, grey };
