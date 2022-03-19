import GettingStartedButton from "../../../components/shared/buttons/getting-started-button";

import styled from "styled-components";

export default styled(GettingStartedButton)`
  background-color: rgb(25, 25, 25);
  color: #fff;
  width: 22.6rem;
  padding: 7px 16px 9px;
  line-height: 2rem;
  font-size: 1.4rem;
  font-family: "Roboto", sans-serif;

  &:disabled {
    background: #eeeeee;
    color: #aaaaaa;
    border-color: #eeeeee;
  }
`;
