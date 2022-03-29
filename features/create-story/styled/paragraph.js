import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

export default styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  border: hidden;
  color: rgba(0, 0, 0, 0.84);
  font-size: 20px;
  line-height: 32px;
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.3px;
  min-height: 32px;

  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #b3b3b1;
  }
`;
