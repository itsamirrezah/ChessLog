import styled from "styled-components";

export default styled.button`
  background: #1a8917;
  font-size: 15px;
  color: #fff;
  border-radius: 99em;
  padding: 0 10px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  text-align: left;
  vertical-align: baseline;
  border: none;
  position: relative;

  &:active,
  &:focus,
  &:hover {
    background: rgb(15, 115, 12);
  }

  &:disabled {
    background: rgba(26, 137, 23, 0.25);
  }
`;
