// models/user.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name minimum length should be 3 characters"]
    },
    lastName: {
      type: String,
      minLength: [3, "Last name minimum length should be 3 characters"]
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email minimum length should be 5 characters"]
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketID: {
    type: String, /* we will use socket id to identify the user that where he is */
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Fix: Changed from userSchema.static to userSchema.statics
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;