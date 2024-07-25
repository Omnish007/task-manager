import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onDragStart, onDragEnd, onDragEnter }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdateTask={onEdit}
          onDeleteTask={onDelete}
          onDragStart={(e) => onDragStart(e, task._id, task.status)}
          onDragEnd={onDragEnd}
          onDragEnter={(e) => onDragEnter(e, index)}
        />
      ))}
    </div>
  );
};

export default TaskList;
