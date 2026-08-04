import { useEffect, useRef, useState } from "react";
import TaskCardButton from "./TaskCardButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/taskform.css";
import { useTaskContext } from "../context/taskContext";

const TaskForm = ({ isFormEdit, task, setIsEditModalOpen }) => {
  const { taskData, setTaskData } = useTaskContext();
  //odbiera funkcje setTaskData z App.js
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    priority: 0,
    complete_until_date: null,
  });

  // task edition
  useEffect(() => {
    if (!isFormEdit) return;

    taskData.map(
      (data) =>
        data.created_date.getTime() === task.created_date.getTime() &&
        setFormData(task),
    );
  }, [taskData, isFormEdit, task]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setTaskData((prevTasks) =>
      prevTasks.map((taskItem) =>
        taskItem.created_date.getTime() === task.created_date.getTime()
          ? {
              ...taskItem,
              title: formData.title,
              desc: formData.desc,
              priority: formData.priority,
              complete_until_date: formData.complete_until_date,
            }
          : taskItem,
      ),
    );
    setIsEditModalOpen(false);
  };

  // task restore
  const refTaskData = useRef(taskData);

  const handleRestore = (e) => {
    e.preventDefault();
    setTaskData((prevTasks) =>
      prevTasks.map((taskItem) =>
        taskItem.created_date.getTime() === task.created_date.getTime()
          ? { ...taskItem, refTaskData }
          : taskItem,
      ),
    );
  };

  //-------------------------

  // const [value, setValue] = useState(""); //example

  const handleSubmit = (e) => {
    e.preventDefault(); //blokowanie domyślnej operacji - dla formularza odswiezenie strony
    //z.d.2 walidacja formularza
    if (formData.title === "") {
      toast.error("Aby dodać zadanie musisz podać tytuł", {
        position: "top-center",
        className: "toast-error",
      });
      // alert("Aby dodać zadanie musisz podać tytuł");
      return;
    }

    if (formData.priority === 0) {
      toast.error("Aby dodać zadanie musisz podać priorytet", {
        position: "top-center",
        className: "toast-error",
      });
      return;
    }
    if (formData.complete_until_date === null) {
      toast.error("Aby dodać zadanie musisz podać datę ukończenia", {
        position: "top-center",
        className: "toast-error",
      });
      return;
    }

    setTaskData((prev) => [
      //„weź stare zadania (prev) i dodaj nowe”
      ...prev,
      {
        title: formData.title,
        desc: formData.desc,
        priority: formData.priority,
        created_date: new Date(),
        complete_until_date: formData.complete_until_date,
        completed: false,
      },
    ]);
    toast.success("Dodano zadanie", {
      position: "top-center",
      className: "toast-success",
    });
    //z.d.1 czyszczenie formularza
    setFormData({
      title: "",
      desc: "",
      priority: 0,
      complete_until_date: null,
    });
  };

  return (
    <form className="task-form">
      <div className="task-form-title">
        <ion-icon name="add-circle-outline"></ion-icon>
        {isFormEdit ? <p>EDIT TASK</p> : <p>ADD NEW TASK</p>}
      </div>

      {/* -------TITLE------ */}
      <div className="form-group">
        <label className="task-label" htmlFor="title">
          Title
        </label>
        <input
          className="form-input common-style"
          placeholder="Enter task title"
          type="text"
          id="title"
          /*input WYŚWIETLA to, co jest w formData.title*/
          value={formData.title}
          /*React renderuje i value=nowy formData.title*/
          onChange={(event) => {
            console.log(typeof formData.title);
            setFormData((prev) => ({
              ...prev,
              // desc: prev.desc,
              // priority: prev.priority,
              // date:prev.date,
              title: event.target.value,
            }));
          }}
        />
      </div>
      {/* -------DESCRIPTION------ */}
      <div className="form-group">
        <label className="task-label" htmlFor="desc">
          Description
        </label>
        <textarea
          className="form-textarea common-style"
          placeholder="Enter task description"
          value={formData.desc}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              desc: event.target.value,
            }))
          }
        />
      </div>
      {/* -------PRIORITY------ */}
      <div className="form-group">
        <label className="task-label " htmlFor="priority">
          Priority
        </label>
        <select
          className="form-select common-style"
          value={formData.priority}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              priority: event.target.value,
            }))
          }
        >
          <option disabled value={0}>
            Select priority
          </option>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </div>
      {/* -------DATE------ */}
      <div className="form-group">
        <label className="task-label" htmlFor="complete">
          Complete until
        </label>
        {/* <input className="form-date common-style" type="date" id="complete" /> */}
        <div className="date-input-wrapper">
          <DatePicker
            placeholderText="Select date"
            className="form-date common-style"
            selected={formData.complete_until_date} // selected tylko wyświetla datę w polu DatePickera
            onChange={(
              date, //date to data wybrana przez użytkownika
            ) =>
              setFormData((prev) => ({
                ...prev, //zachowaj wszystko inne np.title,desc i dodaj date
                complete_until_date: date,
              }))
            }
            dateFormat="yyyy-MM-dd"
          />
          <FiCalendar className="calendar-icon" />
        </div>
      </div>
      {isFormEdit && (
        <TaskCardButton type="addTask" onClick={handleRestore}>
          Restore
        </TaskCardButton>
      )}
      {isFormEdit ? (
        <TaskCardButton type="addTask" onClick={handleSaveChanges}>
          Save changes
        </TaskCardButton>
      ) : (
        <TaskCardButton type="addTask" onClick={handleSubmit}>
          + Add task
        </TaskCardButton>
      )}
    </form>
  );
};

export default TaskForm;
