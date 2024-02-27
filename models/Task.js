// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority : { 
    type: String,

    enum: ['high', 'medium' ,'low'],
  
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    enum: ['not done', 'done'],
    default: 'not done'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;