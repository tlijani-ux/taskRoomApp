// server.js

const express = require('express');
const app = express();
const PORT =  6000;

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads

// Database connection
require('./config/connectDB');


// Routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes=require('./routes/projectRoutes')
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/projects',projectRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
