const Project = require('../models/Project');
const Task = require('../models/Task');
const Notice = require('../models/notification');

const projectController = {
    getAllProjectsWithSubtasksTitles: async (req, res) => {
        try {
            const projects = await Project.find({}, 'title subTasks')
                .populate({
                    path: 'subTasks',
                    select: 'title description', 
                })
            res.status(200).json(projects);
        } catch (error) {
            console.error('Error retrieving projects with subtasks:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    createProject: async (req, res) => {
        try {
          const { title, team, stage, date, priority } = req.body;
          const newProject = new Project({
            title,
            team,
            stage: stage.toLowerCase(),
            date: new Date(date),
            priority: priority.toLowerCase(),
          });
              await newProject.save();
          // Create the notice text
          let text = "New Project has been assigned to you";
          if (team?.length > 1) {
            text = text + ` and ${team?.length - 1} others.`;
          }
          text =
            text +
            ` The Project priority is set a ${priority} priority, so check and act accordingly. The Project date is ${new Date(
              date
            ).toDateString()}. Thank you!!!`;
    
          // Create a  notification associated with the  project
        await Notice.create({
            team,
            text,
            project: newProject._id,
        });
        res.status(201).json({ message: 'Project created successfully', project: newProject });
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

