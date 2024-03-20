const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.get('/projects/:id/tasks', projectController.getAllTasksForProject);
router.get('/get', projectController.getAllProjectsWithSubtasksTitles);
router.get('/getById/:id', projectController.getProjectById);
router.post('/create', projectController.createProject);
router.delete('/delete/:id', projectController.deleteProject);







module.exports = router;
