import React from "react";
import { TaskListProps, Task } from "../types";
import TaskItem from "../TaskItem";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onDelete,
}) => {
  if (!tasks.length) {
    return <p>No tasks available.</p>;
  }

  return (
    <div>
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id} // ✅ unique key
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;