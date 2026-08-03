import { useState } from "react";
import { priorities } from "../utils/constants";
import Modal from "./Modal";
import TaskCardButton from "./TaskCardButton";
import { useTaskContext } from "../context/taskContext";
import EditModal from "./EditModal";

const TaskCard = ({ task }) => {
  const { setTaskData } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  //oznaczenie zadania jako completed
  const handleComplete = () => {
    setTaskData((prevTasks) =>
      prevTasks.map((taskItem) =>
        taskItem.created_date.getTime() === task.created_date.getTime()
          ? { ...taskItem, completed: true }
          : taskItem,
      ),
    );
  };

  //kasowanie zadania
  const handleDelete = () => {
    setTaskData((prevTasks) =>
      prevTasks.map((taskItem) =>
        taskItem.created_date.getTime() === task.created_date.getTime()
          ? { ...taskItem, deleted: true }
          : taskItem,
      ),
    );
  };

  const priorityClass = priorities[task.priority].toLowerCase();

  return (
    <>
      {task.deleted === true ? null : (
        <div className={`task-card task-card-${priorityClass}`}>
          <p className={`priority priority-${priorityClass}`}>
            {priorities[task.priority]}
          </p>
          <h3 className="task-title"> {task.title}</h3>

          <TaskCardButton type={"taskDetails"} onClick={handleClick}>
            Task details
          </TaskCardButton>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h3 className="modal-title">Task details</h3>
            <p>Description: {task.desc || "No description"}</p>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
            <p>Created: {task.created_date.toLocaleDateString()}</p>
            <p>
              Complete until: {task.complete_until_date.toLocaleDateString()}
            </p>
          </Modal>
          <div className="buttons">
            <TaskCardButton
              type={"edit"}
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </TaskCardButton>
            <EditModal isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} task={task}></EditModal>
            {!task.completed ? (
              <TaskCardButton type={"complete"} onClick={handleComplete}>
                Complete
              </TaskCardButton>
            ) : null}
            <TaskCardButton type={"delete"} onClick={handleDelete}>
              Delete
            </TaskCardButton>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
