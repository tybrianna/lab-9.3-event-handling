import React from "react";
import TaskItem from "../TaskItem/TaskItem";

type Task = React.ComponentProps<typeof TaskItem>["task"];

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onDelete,
}) => {
  if (!tasks.length) {
    return <p className="empty">No tasks match your filters.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id} // ✅ proper key
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;