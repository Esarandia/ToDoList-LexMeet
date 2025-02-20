import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('dark');

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  function addTask(title, dueDate, dueTime, description) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      dueDate,
      dueTime,
      description,
    };

    setTasksAndSave([...tasks, newTask]);
    toast.success("Task created successfully!");  
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
    toast.error("Task deleted successfully!");  
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
    toast.info("Task updated successfully!");  
  }

  function editTaskById(taskId, newTitle, newDescription, newDueDate, newDueTime) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, title: newTitle, description: newDescription, dueDate: newDueDate, dueTime: newDueTime };
      }
      return task;
    });
    setTasksAndSave(newTasks);
    toast.success("Task edited successfully!");  
  }

  // Complete or toggle all tasks
  function completeAllTasks(newTasks) {
    setTasksAndSave(newTasks);
    toast.info("All tasks have been completed!");
  }

  // Delete all tasks
  function deleteAllTasks() {
    setTasksAndSave([]);
    toast.error("All tasks deleted successfully!");
  }

  return (
    <>
      <Header 
        handleAddTask={addTask} 
        theme={theme} 
        setTheme={setTheme} 
      />

      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onEdit={editTaskById}
        onCompleteAll={completeAllTasks}
        onDeleteAll={deleteAllTasks}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000} 
        hideProgressBar={false}  
        newestOnTop={false}  
        closeOnClick={true}  
        rtl={false}  
      />
    </>
  );
}

export default App;
