import React, { useState, useEffect } from "react";
import "./Task.css";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Typography } from "@mui/material";
import { Tabs, Tab, Paper, Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import Slide from "react-reveal/Slide";
import Reveal from "react-reveal/Reveal";
import Pulse from "react-reveal/Pulse";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  const [filter, setFilter] = useState("all");
  const [segmentingOption, setSegmentingOption] = useState("All");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    }
    return true;
  });
  const handleSegmentChange = (event, newValue) => {
    setSegmentingOption(newValue);
  };

  return (
    <div>
      <div className="tabs">
        {isSmallScreen ? (
          <Slide left>
            <div className="dropdown-filter">
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
              </select>
            </div>
          </Slide>
        ) : (
          <Paper elevation={1} className="Tab">
            <Slide left>
              <Tabs
                value={segmentingOption}
                onChange={handleSegmentChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab
                  className="btn"
                  onClick={() => setFilter("all")}
                  label={`All (${tasks.length})`}
                  value="All"
                />
                <Tab
                  className="btn"
                  onClick={() => setFilter("completed")}
                  label={`Completed `}
                  value="Completed"
                />
                <Tab
                  className="btn"
                  onClick={() => setFilter("active")}
                  label={`Active `}
                  value="Active"
                />
              </Tabs>
            </Slide>
          </Paper>
        )}
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div style={{ display: "flex", textAlign: "justify" }}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <div>
                  <Typography variant="body1"> Title: {task.title}</Typography>
                  <Typography variant="body2" className="descriptionText">
                    Description: {task.description}
                  </Typography>
                </div>
                <Reveal effect="fadeInUp">
                  <Typography variant="caption" className="datetime">
                    @{task.formattedDateTime}
                  </Typography>
                </Reveal>
              </label>
            </div>

            <Button onClick={() => deleteTask(task.id)}>
              <Pulse>
                {" "}
                <DeleteIcon className="deletebtn" />{" "}
              </Pulse>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
