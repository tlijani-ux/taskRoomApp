const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    priority: { 
        type: String,
        enum: ['high', 'medium', 'low'],
    },
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['to do', 'inprogress', 'done'],
        default: 'to do'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
