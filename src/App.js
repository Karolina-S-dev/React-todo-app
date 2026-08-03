import TaskList from "./components/TaskList";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/tasklist.css";
import "./assets/css/app.css";
import "./assets/css/taskform.css";
import "./assets/css/queries.css";
import TaskForm from "./components/TaskForm";
import { useEffect, useState } from "react";
import { useTaskContext } from "./context/taskContext";

function App() {
  const {taskData, setTaskData} = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchedTasks, setSearchedTasks] = useState([]);

  // filtrowanie zadań
  const todos = taskData.filter((task) => !task.completed && !task.deleted);
  const filteredSearchedTodos = searchedTasks.filter(
    (task) => !task.completed && !task.deleted,
  );
  const dependendTodos = !debouncedSearchTerm ? todos : filteredSearchedTodos;

  const completed = taskData.filter((task) => task.completed && !task.deleted);
  const filteredSearchedCompleted = searchedTasks.filter(
    (task) => task.completed && !task.deleted,
  );
  const dependentCompleted = !debouncedSearchTerm
    ? completed
    : filteredSearchedCompleted;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //debouncing
  useEffect(() => {
    const delayedSetter = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 600);
    return () => clearTimeout(delayedSetter);
  }, [searchTerm]);

  useEffect(() => {
    const handleFilter = () => {
      const filteredTasks = taskData.filter((task) =>
        task.title.includes(debouncedSearchTerm),
      );
      setSearchedTasks(filteredTasks);
    };
    handleFilter();
  }, [debouncedSearchTerm, taskData]);

  return (
    <>
      <header>
        <h1>Task Manager</h1>
      </header>
      <div className="content-container">
        <TaskForm/>
        <div className="task-lists-container">
          <h2>YOUR TASKS</h2>
          <h3>Manage and organize your tasks efficiently</h3>
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
          <div className="tasks-container-row">
            <TaskList
              title="Todos"
              titleAlternative="No tasks yet"
              tasksList={taskData ? dependendTodos : null}
            />

            <TaskList
              title="Completed"
              titleAlternative="No completed tasks yet"
              tasksList={taskData ? dependentCompleted : null}
              setTaskData={setTaskData}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        toastStyle={{
          minHeight: "40px",
        }}
        transition={Flip}
      />
    </>
  );
}

export default App;
