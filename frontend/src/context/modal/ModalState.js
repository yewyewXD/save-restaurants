import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
  cloneElement,
} from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import { debounce } from "../../utils/modal.utils";

function ModalComponent({ isShowing = true, content, close }) {
  const location = useLocation();
  const locationRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== locationRef.current) {
      locationRef.current = location.pathname;
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Modal
      appElement={document.getElementById("root")}
      isOpen={isShowing}
      className="Modal Modal--autoWidth"
      overlayClassName="ModalOverlay"
      closeTimeoutMS={250}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
    >
      {content ? cloneElement(content, { close }) : null}
    </Modal>
  );
}

export const ModalContext = createContext({});

export function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const handleShowModal = useCallback((_content) => {
    setContent(_content);
    setShowModal(true);
  }, []);
  const handleHideModal = useCallback(() => {
    setShowModal(false);
    debounce(() => setContent(null), 250)();
  }, []);
  return (
    <ModalContext.Provider value={{ handleShowModal, handleHideModal }}>
      <ModalComponent
        content={content}
        close={handleHideModal}
        isShowing={showModal}
      />
      {children}
    </ModalContext.Provider>
  );
}

/**
 * Helper that shows a modal.
 * const { show, hide } = useModal()
 * show<Component>(ReactComponent)
 */
export function useModal() {
  const { handleShowModal, handleHideModal } = useContext(ModalContext);

  return { handleShowModal, handleHideModal };
}
