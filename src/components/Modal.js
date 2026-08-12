import { createPortal } from "react-dom";

const Modal = ({ activeModal, setActiveModal, children, className = "" }) => {
  return createPortal(
    <>
      {activeModal ? (
        <div className="modal-overlay">
          <div className={className}>
            <ion-icon
              name="close-outline"
              onClick={() => setActiveModal(null)}
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
