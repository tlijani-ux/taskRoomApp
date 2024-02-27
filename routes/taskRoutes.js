// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define task routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.get('/user/:id', taskController.getAllTasksByIdUser);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
