import styled, { css } from "styled-components";

const Md = css`
  font-size: 22px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Sm = css`
  line-height: 20px;
  font-weight: 900;
  font-size: 16px;
  color: rgb(41, 41, 41);
`;

export default styled.h2`
  ${({ variant }) => variants[variant] || Md}
`;

const variants = {
  md: Md,
  sm: Sm,
};
