import useAuth from "../../lib/context/auth-context";
import Modal from "../../components/shared/modals/modal";
import Auth from "./auth";

export default function AuthModal() {
  const { isAuth, isModalShown, hideModal } = useAuth();

  return isModalShown && !isAuth ? (
    <Modal>
      <Auth hide={hideModal} isClosable={true} />
    </Modal>
  ) : null;
}
