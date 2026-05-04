import React, { useState } from "react";

type TaskStatus = "pending" | "in-progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
  }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");

  const handleFilterChange = (
    newStatus: typeof status,
    newPriority: typeof priority
  ) => {
    setStatus(newStatus);
    setPriority(newPriority);

    onFilterChange({
      status: newStatus || undefined,
      priority: newPriority || undefined,
    });
  };

  return (
    <div>
      <select
        value={status}
        onChange={(e) =>
          handleFilterChange(e.target.value as TaskStatus | "", priority)
        }
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          handleFilterChange(status, e.target.value as typeof priority)
        }
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default TaskFilter;