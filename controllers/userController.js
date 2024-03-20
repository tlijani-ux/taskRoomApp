const Notice = require('../models/notification');
const User = require('../models/User');
const Project = require('../models/Project');

const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');

const userController = {
  signup: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (!user.isActive) {
        return res.status(401).json({
          status: false,
          message: "User account has been deactivated, contact the admin"
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // User authenticated
        const token = generateToken(user);
        return res.status(200).json({ message: 'User authenticated', token }); // Return token
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  teamlist: async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const project = await Project.findById(projectId).populate('team');
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      const teamMembers = project.team.map(member => ({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email
      }));
  
      res.status(200).json(teamMembers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  getNotificationsList: async (req, res) => {
    try {
      const { userId } = req.user;
  
      const notice = await Notice.findOne({
        //team that includes my id
        team: userId,
        //if my id not in it
        isRead: { $nin: userId },
      }).populate("project", 'title');
      res.status(200).json(notice);
  
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: false, message: error.message });
    }
  },
    
  markNotificationRead: async (req, res) => {
    try {
      const { userId } = req.user;
      const { isReadType, id } = req.query;
  
      if (isReadType === "all") {
        await Notice.updateMany(
          { team: userId, isRead: { $nin: [userId] } },
          { $push: { isRead: userId } },
          { new: true }
        );
      } else {
        await Notice.findOneAndUpdate(
          { _id: id, isRead: { $nin: [userId] } },
          { $push: { isRead: userId } },
        );
      }
  
      res.status(200).json({ message: 'Notifications marked as read successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  changeUserPassword:async(req,res)=>{

    try {
      const {userId}=req.user;
      const user=await User.findById(userId);
      if(user){
        user.password = req.body.password;
        await user.save();
        user.password=undefined;
        res.status(201).json({
          status:true,
          message: `Password changed succesfully`
        })
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = userController;
