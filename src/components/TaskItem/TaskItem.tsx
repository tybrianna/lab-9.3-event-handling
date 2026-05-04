import React from "react";

type TaskStatus = "pending" | "in-progress" | "completed";

type TaskPriority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
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
    <div className={`task-item ${status}`}>
      <h3>
        {title} {priority === "high" && <span>🔥</span>}
      </h3>

      <p>{description}</p>

      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      <p>Due: {dueDate}</p>

      {/* Conditional Rendering */}
      {isOverdue && <p style={{ color: "red" }}>⚠️ Overdue</p>}

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
  );
};

export default TaskItem;