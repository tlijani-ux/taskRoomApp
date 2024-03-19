// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { protectRoute, isAdminRoute } = require('../middlewares/authMiddleware');
const cors = require('cors'); 
const router = express.Router();
router.use(cors());
const Project = require('../models/Project'); // Adjust the path as per your project structure


//  routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

router.get('/get-team/:projectId', userController.teamlist);
router.get('/notifications', protectRoute, userController.getNotificationsList);

// router.put('/profile', protectRoute , updateUserProfile);
router.put('/read-notifications', protectRoute, userController.markNotificationRead);
router.put('/change-password',protectRoute , userController.changeUserPassword);




module.exports = router;
