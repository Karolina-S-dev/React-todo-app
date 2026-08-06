import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen ? (
        <div className="modal-overlay">
          <div className="modal">
            <ion-icon
              className="closing-x"
              name="close-outline"
              onClick={onClose}
            ></ion-icon>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      ) : null}
    </>,
    document.body,
  );
};

export default Modal;
