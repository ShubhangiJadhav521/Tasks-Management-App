import React, { useState } from "react";
import "./Task.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = ({ addTask, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const currentDateTime = new Date();
  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentDateTime);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    addTask(title, description, formattedDateTime);
    setTitle("");
    setDescription("");
    toast.success("Tasks Added Successfully !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default TaskForm;
