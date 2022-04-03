import styled from "styled-components";

export default styled.hr`
  margin: ${({ space }) => `${space ? `${space}px` : "32px"} 0`};
  border: 0 none;
  height: 1px;
  background-color: rgb(230, 230, 230);
`;
