import { useState } from 'react';

const useDragAndDrop = (tasks, updateTask) => {
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [dropTargetStatus, setDropTargetStatus] = useState('');
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  const handleDragStart = (event, taskId, status) => {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('status', status);
    event.target.classList.add('dragging');
    setDraggingTaskId(taskId);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
    setDraggingTaskId(null);
    setDropTargetStatus('');
    setDropTargetIndex(null);
  };

  const handleDragOver = (event, status) => {
    event.preventDefault();
    setDropTargetStatus(status);
  };

  const handleDragLeave = () => {
    setDropTargetStatus('');
  };

  const handleDrop = async (event, targetStatus, targetIndex) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    const status = event.dataTransfer.getData('status');

    if (status === targetStatus && targetIndex === null) {
      setDropTargetStatus('');
      setDropTargetIndex(null);
      return;
    }

    const updatedTasks = [...tasks];
    const draggedTaskIndex = updatedTasks.findIndex((task) => task._id === taskId);
    const draggedTask = updatedTasks[draggedTaskIndex];

    if (!draggedTask) {
      setDropTargetStatus('');
      setDropTargetIndex(null);
      setDraggingTaskId(null);
      return;
    }

    updatedTasks.splice(draggedTaskIndex, 1);

    if (targetIndex === null || targetIndex === updatedTasks.length) {
      updatedTasks.push({ ...draggedTask, status: targetStatus });
    } else {
      updatedTasks.splice(targetIndex, 0, { ...draggedTask, status: targetStatus });
    }

    setDropTargetStatus('');
    setDropTargetIndex(null);
    setDraggingTaskId(null);

    await updateTask(taskId, { ...draggedTask, status: targetStatus });
  };

  const handleDragEnter = (event, targetIndex) => {
    if (targetIndex !== tasks.findIndex((task) => task._id === draggingTaskId) || targetIndex === 0) {
      setDropTargetIndex(targetIndex);
    }
  };

  return {
    draggingTaskId,
    dropTargetStatus,
    dropTargetIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnter,
  };
};

export default useDragAndDrop;
