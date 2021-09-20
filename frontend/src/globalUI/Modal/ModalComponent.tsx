import React, { useRef, useEffect, FC, cloneElement } from "react";
const Modal = require("react-modal");
const { useLocation } = require("react-router-dom");

interface Props {
  isShowing: boolean;
  content: any;
  close: Function;
}

const ModalComponent: FC<Props> = ({ isShowing, content, close }) => {
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
};
export default ModalComponent;
