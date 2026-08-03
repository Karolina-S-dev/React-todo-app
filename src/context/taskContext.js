import { createContext, useContext, useState } from "react";

const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState([]);

  return (
    <TaskContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};

export { TaskProvider, useTaskContext };
