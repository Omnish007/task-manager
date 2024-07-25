const Task = require('../models/Task');
const TaskStatus = require('../config/taskConfig'); 

const validateStatus = (status) => Object.values(TaskStatus).includes(status);

exports.getTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ userId });
    const normalizedTasks = tasks.map(task => ({
      ...task.toObject(),
      status: task.status
    }));
    res.json(normalizedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addTask = async (req, res) => {
  const { title, description, status, userId, dueDate } = req.body;

  if (!validateStatus(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status: status,
      userId,
      dueDate
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Data' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  if (status && !validateStatus(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status: status ? status : undefined,
        dueDate
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Data' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
