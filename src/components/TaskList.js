import TaskCard from "./TaskCard";

const TaskList = ({ title, titleAlternative, tasksList }) => {
  return (
    <div className="task-list">
      {tasksList.length === 0 ? <h2>{titleAlternative}</h2> : <h2>{title}</h2>}
      <div className="tasklist-cards-row">
        {tasksList.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
