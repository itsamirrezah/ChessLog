import styled from "styled-components";
import { FaRegEnvelope } from "react-icons/fa";

export default function AuthButton({ children, onClick }) {
  return (
    <Button onClick={onClick}>
      <div>
        <FaRegEnvelope size={17} fontSize={24} fill="rgba(0,0,0,0.6)" />
        <span>{children}</span>
      </div>
    </Button>
  );
}

const Button = styled.button`
  border-radius: 200px;
  outline: none;
  width: 21.2rem;
  line-height: 2rem;
  border: 1px solid rgb(168, 168, 168);
  padding: 0.9rem 1.6rem;
  cursor: pointer;
  color: rgb(41, 41, 41);
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;

  &:hover {
    border-color: rgb(0, 0, 0);
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8rem;

    & > span {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
