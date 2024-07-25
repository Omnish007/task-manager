import React from 'react';
import { TaskStatus } from '../config/taskConfig';
import { XMarkIcon } from '@heroicons/react/24/outline';

function TaskFilter({ filter, setFilter }) {
  const clearFilters = () => {
    setFilter({ status: '', search: '' });
  };

  return (
    <div className="p-2 flex items-center gap-2">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        className="border rounded py-2 px-3 text-gray-900 flex-grow"
      />
      
      {/* Status Dropdown */}
      <select
        className="border rounded py-2 px-3 text-gray-900"
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
      >
        <option value="">All</option>
        <option value={TaskStatus.TODO}>To Do</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
      </select>
      
      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="bg-red-500 text-white rounded-full p-2 flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Clear filters"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default TaskFilter;
