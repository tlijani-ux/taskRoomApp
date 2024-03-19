const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isAdmin:{
     type:Boolean,
     required:true,
     default:false,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project" 
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Task" 
    }
  ],
  isActive: {
    type :Boolean,
    required:true,
    default:true
  }
},
    {timestamps: true }
  );

// Use mongoose hook middleware to hash the input password just before save in database
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Use mongoose hook middleware to compare  password with the hashed password in database
// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };


// Use our custom method to generate the ACCESS TOKEN
// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       firstName: this.firstName,
//       lastName: this.lastName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };
// Use our custom method to generate the REFRESH TOKEN
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };




const User = mongoose.model('User', userSchema);

module.exports = User;
