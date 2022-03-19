import styled from "styled-components";
export default function LinkButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

const Button = styled.button`
  background-color: transparent;
  padding: 0.5rem;
  border-radius: 0%;
  outline: none;
  border: none;
  cursor: pointer;
  &:active,
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0.1rem);
  }
`;
