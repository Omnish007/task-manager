import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TaskStatus } from '../config/taskConfig';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onDragStart, onDragEnd, onDragEnter }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = () => {
    if (title && description) {
      onUpdateTask(task._id, { ...task, title, description, status });
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 mb-4 relative flex flex-col gap-2 ${isEditing ? 'border border-blue-500' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, task._id, task.status)}
      onDragEnd={onDragEnd}
      onDragEnter={(e) => onDragEnter(e)}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm md:text-base"
            placeholder="Task title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm md:text-base"
            placeholder="Task description"
            rows="3"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 mt-2 text-sm md:text-base"
          >
            <option value="">All</option>
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white py-2 px-3 rounded-lg text-xs md:text-sm hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white py-2 px-3 rounded-lg text-xs md:text-sm hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm md:text-base">{task.description}</p>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-green-700"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDeleteTask(task._id)}
              className="text-gray-500 hover:text-red-600"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
