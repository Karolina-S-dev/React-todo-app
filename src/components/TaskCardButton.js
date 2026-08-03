const TaskCardButton = ({ type, children, onClick }) => {
  return (
    <>
      {type === "complete" ? (
        <button className="btn btn-green" onClick={onClick}>
          <ion-icon name="checkmark-outline"></ion-icon>
          {children}
        </button>
      ) : null}
      {type === "delete" ? (
        <button className="btn btn-red" onClick={onClick}>
          <ion-icon name="trash-outline"></ion-icon>
          {children}
        </button>
      ) : null}
      {type === "taskDetails" ? (
        <button className="btn btn-full" onClick={onClick}>
          {children}
        </button>
      ) : null}
      {type === "addTask" ? (
        <button className="btn btn-add-task" onClick={onClick}>
          {children}
        </button>
      ) : null}
      {type === "edit" ? (
        <button className="btn " onClick={onClick}>
          {children}
        </button>
      ) : null}
    </>
  );
};

export default TaskCardButton;
