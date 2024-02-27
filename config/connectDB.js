// // config/db.js

// const mongoose = require('mongoose');

// const MONGODB =process.env.mongodb;

// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(MONGODB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected:', connection.connection.host);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
