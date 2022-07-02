import Modal from "../../components/shared/modals/modal";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ConfirmationStory from "./story-confirmation";

export default function ConfirmationModal({ onClose }) {
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    if (!isShown) setShown(true);
  }, []);
  return (
    isShown && (
      <Modal>
        <ConfirmationStory onClose={onClose} />
      </Modal>
    )
  );
}

const SearchBar = styled.div`
  position: absolute;
  background: red;
  top: 120%;
  left: 0;
  /* overflow: scroll; */
  width: 100%;
`;

const MultiSelectInput = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-right: 4px;
  }

  & > input {
    flex-grow: 1;
    border: none;
  }

  & > input:focus-visible {
    outline: none;
  }
`;

const SearchAndMultiSelectStyled = styled.div`
  position: relative;
  border-bottom: 1px solid rgb(168, 168, 168);
  gap: 2px;
  width: 100%;
`;
