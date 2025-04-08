// controllers/user.controller.js
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { fullName, email, password } = req.body;

    // Fix: Using await with userModel.hashPassword
    const hashPassword = await userModel.hashPassword(password);

    // Fix: Using await with userService.createUser
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword
    });

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    const token = user.generateAuthToken();
    res.status(201).json({ message: "User created", user, token });
  } catch (error) {
    next(error);
  }
};
// register user controller edns here
// login user controller starts here
module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ message: "Login successful", user, token });
  }
  catch (error) {
    next(error);
  }
}
