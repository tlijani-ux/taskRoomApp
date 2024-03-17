const Project = require('../models/Project');
const Task = require('../models/Task');


const projectController = {
    getAllProjects : async(req,res) =>{
        try {
            const tasks = await Project.find();
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    createProject: async (req, res) => {
        const { title, dueDate, userId } = req.body;
        try {
            const newProject = new Project({
                title,
                dueDate,
                user: userId ,
            });
            await newProject.save();
            res.status(201).json({ message: 'Project created successfully' , project: newProject });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    
    getProjectById: async (req, res) => {
        const projectId = req.params.id;
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    deleteProject: async (req, res) => {
        const projectId = req.params.id;
        try {
            const deletedProject = await Project.findByIdAndDelete(projectId);
            if (!deletedProject) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    getAllTasksForProject: async (req, res) => {
        const projectId = req.params.id;
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            const tasks = await Task.find({ project: projectId });
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}





module.exports = projectController;

