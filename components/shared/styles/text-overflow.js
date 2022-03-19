import { css } from "styled-components";

export default css`
  display: -webkit-box;
  box-orient: vertical;
  line-clamp: ${(props) => props.line || 2};
  text-overflow: ellipsis;
  overflow: hidden;
`;
