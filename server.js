// server.js

const express = require('express');
const app = express();
const PORT =  4000;
const cors=require('cors');

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors())

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
