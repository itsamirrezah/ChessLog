import styled from "styled-components";
import { FaAngleLeft } from "react-icons/fa";
import TextButton from "../../../components/shared/buttons/text-button";

export default function ReturnButton({ children, onClick }) {
  return (
    <Container onClick={onClick}>
      <FaAngleLeft size={18} />
      {children}
    </Container>
  );
}
const Container = styled(TextButton)`
  font-weight: 400;
  margin-top: 20px;
  color: rgb(26, 137, 23);
  font-size: 1.4rem;
  & > svg {
    vertical-align: middle;
    margin-right: 2px;
  }
`;
