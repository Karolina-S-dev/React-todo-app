import { createPortal } from "react-dom";
import TaskForm from "./TaskForm";

const EditModal = ({ isEditModalOpen, setIsEditModalOpen, task }) => {
  console.log(task);

  return createPortal(
    <>
      {isEditModalOpen && (
        <div className="edit-modal-wrapper">
          <div className="edit-modal flex-col">
            <ion-icon
              name="close-outline"
              onclick={() => setIsEditModalOpen(false)}
            ></ion-icon>
            <TaskForm task={task} setIsEditModalOpen={setIsEditModalOpen} />
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

export default EditModal;
