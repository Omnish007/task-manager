import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getTasks = async (userId) => {
  const response = await api.get(`/tasks/${userId}`);
  return response.data;
};

export const addTask = async (task, userId) => {
  const response = await api.post('/tasks', { ...task, userId });
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
