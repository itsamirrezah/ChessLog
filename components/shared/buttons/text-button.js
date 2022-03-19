import styled from "styled-components";
import { css } from "styled-components";

export default styled.button`
  color: ${({ color }) => color || "#191919"};
  background-color: transparent;
  font-size: 1.6rem;
  border: none;
  font-family: "Roboto", sans-serif;

  ${({ isBold }) => isBold && bold}
`;

const bold = css`
  font-weight: 900;
  font-weight: bold;
`;
