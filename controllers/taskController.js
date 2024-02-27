// controllers/taskController.js

const Task = require('../models/Task');

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createTask: async (req, res) => {
    const { title, description, userId } = req.body;
    try {
      const newTask = new Task({
        title,
        description,
        user: userId
      });
      await newTask.save();
      res.status(201).json({ message: 'Task created successfully' });
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
  getAllTasksByIdUser : async (req,res)=>{
    const userId = req.params.id;
      try {
        const tasks = await Task.find({user:userId});
        res.status(200).json(tasks);
      }catch(error){
      console.log(error);
      res.status(404).json({message: "task not found with id of user " + userId})
    } 
  },


    updateTask: async (req, res) => {
        const taskId = req.params.id;
        const { title, description, status } = req.body; // Include status in the request body
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
