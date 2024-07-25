import React, { useState } from 'react';
import { TaskStatus } from '../config/taskConfig';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(TaskStatus.TODO);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onAddTask({ title, description, status });
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.TODO);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="border rounded w-full py-2 px-3 mt-1 text-gray-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="border rounded w-full py-2 px-3 mt-1 text-gray-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          className="border rounded w-full py-2 px-3 mt-1 text-gray-900"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={TaskStatus.TODO}>To Do</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.DONE}>Done</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
