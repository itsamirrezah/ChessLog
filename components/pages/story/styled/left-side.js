import styled from "styled-components";
import { css } from "styled-components";

export default styled.div`
  opacity: 1;
  visibility: visible;
  transition: all 0.6s;
  grid-row-start: 1;
  grid-column: 1 / span 2;

  /* position: sticky; */
  /* top: 3rem; */

  /* grid-row-start: 1;
  grid-column: 1 / span 3; */

  ${({ isHidden }) => isHidden && hidden}
`;

const hidden = css`
  opacity: 0;
  visibility: hidden;
`;
