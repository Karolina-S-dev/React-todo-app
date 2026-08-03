import TaskForm from "./TaskForm";

const EditModal = ({ isEditModalOpen, setIsEditModalOpen, task }) => {
  return (
    <>
      {isEditModalOpen && (
        <div className="edit-modal-wrapper">
          <div className="edit-modal flex-col">
            <ion-icon
              name="close-outline"
              onclick={() => setIsEditModalOpen(false)}
            ></ion-icon>
            <TaskForm isFormEdit task={task} setIsEditModalOpen={setIsEditModalOpen}></TaskForm>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
