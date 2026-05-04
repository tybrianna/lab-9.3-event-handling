import React from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  const { id, title, description, status, priority, dueDate } = task;

  const isOverdue =
    status !== "completed" && new Date(dueDate) < new Date();

  return (
    <div className={`task-item ${status} ${priority}`}>
      <div className="task-header">
        <h3>{title}</h3>
        <span className={`badge ${priority}`}>{priority}</span>
      </div>

      <p>{description}</p>

      <div className="task-meta">
        <span>Status: {status}</span>
        <span>Due: {dueDate}</span>
      </div>

      {/* Conditional Rendering */}
      {isOverdue && <p className="overdue">⚠ Overdue</p>}

      <div className="task-actions">
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(id, e.target.value as typeof status)
          }
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;