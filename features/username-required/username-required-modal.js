import Modal from "../../components/shared/modals/modal";
import { useState, useEffect } from "react";
import UsernameRequired from "./username-required";
import { useRouter } from "next/router";

export default function AuthorInfoModal() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setShow(true);
  }, []);

  function hide() {
    router.reload();
  }

  return show ? (
    <Modal>
      <UsernameRequired hide={hide} />
    </Modal>
  ) : null;
}
