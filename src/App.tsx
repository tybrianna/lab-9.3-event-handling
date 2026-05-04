import React, { useState } from "react";
import "./App.css";

type TaskStatus = "pending" | "in-progress" | "completed";

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  dueDate: string;
};

type FilterOptions = {
  status?: TaskStatus;
  priority?: "low" | "medium" | "high";
};

interface TaskFilterProps {
  onFilterChange: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as TaskStatus | "";
    onFilterChange((prev) => ({
      ...prev,
      status: status || undefined,
    }));
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = event.target.value as "low" | "medium" | "high" | "";
    onFilterChange((prev) => ({
      ...prev,
      priority: priority || undefined,
    }));
  };

  return (
    <div className="task-filter">
      <label>
        Status:
        <select onChange={handleStatusChange} defaultValue="">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>
        Priority:
        <select onChange={handlePriorityChange} defaultValue="">
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
  );
};

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <label>
              Status:
              <select
                value={task.status}
                onChange={(event) =>
                  onStatusChange(task.id, event.target.value as TaskStatus)
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <button type="button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

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