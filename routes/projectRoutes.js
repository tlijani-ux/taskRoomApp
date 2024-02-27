const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.get('/projects/:id/tasks', projectController.getAllTasksForProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', projectController.createProject);
router.delete('/projects/:id', projectController.deleteProject);







module.exports = router;
