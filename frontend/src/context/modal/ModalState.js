import React, { createContext, useState, useCallback, useContext } from "react";
import ModalComponent from "../../globalUI/Modal/ModalComponent";
import { debounce } from "../../utils/modal.utils";

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
        close={handleHideModal ? handleHideModal : () => {}}
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
