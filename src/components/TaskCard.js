import { useState } from "react";
import { priorities } from "../utils/constants";
import Modal from "./Modal";
import TaskCardButton from "./TaskCardButton";
import { useTaskContext } from "../context/taskContext";
import TaskForm from "./TaskForm";

const TaskCard = ({ task }) => {
  const { setTaskData } = useTaskContext();
  const [activeModal, setActiveModal] = useState(null);

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

          <TaskCardButton
            type={"taskDetails"}
            onClick={() => setActiveModal("detailsModal")}
          >
            Task details
          </TaskCardButton>

          {activeModal === "detailsModal" && (
            <Modal
              activeModal={activeModal}
              setActiveModal={setActiveModal}
              className="modal"
            >
              <h3 className="modal-title">Task details</h3>
              <p>Description: {task.desc || "No description"}</p>
              <p>Completed: {task.completed ? "Yes" : "No"}</p>
              <p>Created: {task.created_date.toLocaleDateString()}</p>
              <p>
                Complete until: {task.complete_until_date.toLocaleDateString()}
              </p>
            </Modal>
          )}

          <div className="buttons">
            <TaskCardButton
              type={"edit"}
              onClick={() => setActiveModal("editModal")}
            >
              Edit
            </TaskCardButton>

            {activeModal === "editModal" && (
              <Modal
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                className="edit-modal flex-col"
              >
                <TaskForm task={task} setActiveModal={setActiveModal}/>
              </Modal>
            )}

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
