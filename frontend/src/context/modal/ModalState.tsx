import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  FC,
} from "react";
import ModalComponent from "../../globalUI/Modal/ModalComponent";
import { debounce } from "../../utils/modal.utils";

interface IModalContextState {
  handleShowModal: Function;
  handleHideModal: Function;
}

export const ModalContext = createContext<IModalContextState>({
  handleShowModal: () => {},
  handleHideModal: () => {},
});

export const ModalProvider: FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const handleShowModal = useCallback((_content): void => {
    setContent(_content);
    setShowModal(true);
  }, []);
  const handleHideModal = useCallback((): void => {
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
};

export function useModal(): IModalContextState {
  const { handleShowModal, handleHideModal } = useContext(ModalContext);

  return { handleShowModal, handleHideModal };
}
