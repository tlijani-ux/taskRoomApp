const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: { 
        type: String,
        enum: ['high', 'medium', 'low'],
        default:"medium",
    },
    date:{
        type: Date,
        default: new Date()
    },
    stage:{
        type: String,
        enum: ['to do', 'in progress', 'completed'],
        default: 'to do'
    },
    subTasks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    team:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    isTrashed: {
        type:Boolean, default:false
    },
},
   {timestamps:true}
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
