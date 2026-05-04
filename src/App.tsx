import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { Task, TaskStatus } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Finish project",
      description: "Complete the React TypeScript task app",
      status: "pending",
      priority: "high",
      dueDate: "2026-05-10",
    },
    {
      id: "2",
      title: "Study TypeScript",
      description: "Go over interfaces and props",
      status: "in-progress",
      priority: "medium",
      dueDate: "2026-05-08",
    },
  ]);

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

  // Status update
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Delete
  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority)
    );
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskFilter onFilterChange={setFilters} />

      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;