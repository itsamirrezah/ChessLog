import { css } from "styled-components";

export default css`
  display: grid;
  grid-template-columns: repeat(8, 1fr) repeat(4, minmax(48px, 1fr));
  grid-template-rows: 1fr;
`;
