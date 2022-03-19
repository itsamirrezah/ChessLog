import styled from "styled-components";

export default styled.button`
  padding: 1rem 1.6rem;
  background-color: #3d0264;
  color: #cfaade;
  font-size: 2.2rem;
  border-radius: 4px;
  border: none;
  box-shadow: -2px 0px 8px rgba(195, 200, 205, 0.05),
    2px 1px 18px rgba(0, 0, 0, 0.6);

  transition: transform 0.1s;
  cursor: pointer;
  align-self: flex-end;

  &:active {
    transform: translateY(0.1rem);
  }

  &:hover {
    background-color: #5a097a;
  }
`;
