const mongoose = require('mongoose');
const TaskStatus = require('../config/taskConfig');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
    set: (status) => status.trim(),
  },
  userId: {
    type: String,
    required: true,
  },
  dueDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);
