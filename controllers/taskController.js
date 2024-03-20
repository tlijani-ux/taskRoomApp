// controllers/taskController.js

const Task = require('../models/Task');
const Project = require('../models/Project');

const taskController = {

  getAllTasks: async (req, res) => {
    try {
      const projectId = req.params.projectId;
  
      //// Find tasks associated with the  projectId
      const tasks = await Task.find({ projectId });
  
      if (!tasks) {
        return res.status(404).json({ message: "No tasks found for the provided project ID" });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  

  createTask: async (req, res) => {
    const { title, description, priority, projectId, status } = req.body;
    console.log('Received projectId:', projectId); 
    try {
      const existingProject = await Project.findById(projectId);
      if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const newTask = new Task({
            title,
            description,
            priority,
             projectId,
            status
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
},
  getTaskById: async (req, res) => {
    const taskId = req.params.id;
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  getAllTasksByIdProject : async (req,res)=>{
    const projectId = req.params.id;
      try {
        const tasks = await Task.find({project:projectId});
        res.status(200).json(tasks);
      }catch(error){
      console.log(error);
      res.status(404).json({message: "task not found with id of user " })
    } 
  },
    updateTask: async (req, res) => {
        const taskId = req.params.id;
        const { title, description, status } = req.body; 
        try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        }
    },  
  deleteTask: async (req, res) => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};


module.exports = taskController;
