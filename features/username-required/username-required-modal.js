import Modal from "../../components/shared/modals/modal";
import { useState, useEffect } from "react";
import UsernameRequired from "./username-required";

export default function AuthorInfoModal() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  function hide() {
    setShow(false);
  }

  return show ? (
    <Modal>
      <UsernameRequired hide={hide} />
    </Modal>
  ) : null;
}
