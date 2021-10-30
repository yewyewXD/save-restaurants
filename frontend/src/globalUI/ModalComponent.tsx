import React, { useRef, useEffect, FC } from "react";
const Modal = require("react-modal");
const { useLocation } = require("react-router-dom");

interface IProps {
  isShowing: boolean;
  content: any;
  close: Function;
}

const ModalComponent: FC<IProps> = ({ isShowing, content, close }) => {
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
      className="Modal"
      overlayClassName="ModalOverlay"
      closeTimeoutMS={250}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
    >
      {content}
    </Modal>
  );
};
export default ModalComponent;
