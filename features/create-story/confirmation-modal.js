import Modal from "../../components/shared/modals/modal";
import CloseContainer from "../auth/styled/close-container";
import IconClose from "../../components/shared/icons/close";
import styled from "styled-components";
import PublishButton from "../../components/shared/buttons/publish-button";
import { useRef } from "react";

export default function ConfirmationModal({ onConfirmPublish, onClose }) {
  const excerptRef = useRef();
  const tagsRef = useRef();

  return (
    <Modal>
      <Container>
        {/* FIXME:  refactor */}
        <input placeholder="write your excerpt here..." ref={excerptRef} />
        <input placeholder="input your tags" ref={tagsRef} />
        <PublishButton
          onClick={() =>
            onConfirmPublish(excerptRef.current.value, tagsRef.current.value)
          }
        >
          Publish Now
        </PublishButton>
        <CloseContainer>
          <IconClose onClick={onClose} />
        </CloseContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
`;
