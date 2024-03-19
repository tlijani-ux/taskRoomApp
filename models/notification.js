const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    text:{
        type: String,
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    noticeType: {
        type: String,
        enum: ['alert', 'message'],
        default: "alert",
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
