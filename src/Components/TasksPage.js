import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./Task.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Reveal from "react-reveal/Reveal";

function Taskspage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  // Function to save tasks to local storage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  // Function to add a new task
  const addTask = (title, description, formattedDateTime) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      formattedDateTime,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    toast.error("Tasks Deleteted !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };
  useEffect(() => {
    const storedTasks = loadTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  return (
    <div className="Tasks">
      <Zoom>
        <Typography>
          <span className="mainheading">Task Management App</span>
        </Typography>
      </Zoom>
      <div className="header">
        <Fade top>
          <Typography>
            <AssignmentIcon />
            <span className="heading"> Tasks List</span>
          </Typography>
        </Fade>

        <Fade top>
          <Button className="addbtn" onClick={handleClickOpen}>
            <AddOutlinedIcon /> Add Tasks
          </Button>
        </Fade>
      </div>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <div style={{ display: "flex" }}>
          <DialogTitle id="alert-dialog-title">Add New Task</DialogTitle>
          <CloseOutlinedIcon className="closebtn" onClick={handleClose} />
        </div>
        <DialogContent>
          <TaskForm addTask={addTask} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Reveal effect="fadeInUp">
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </Reveal>
      <ToastContainer />
    </div>
  );
}

export default Taskspage;
