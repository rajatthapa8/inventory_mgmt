const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const dotenv = require("dotenv").config();

//generate web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
//register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  //validation
  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("Please fill out the details");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 character long");
  }

  //check if email is unique
  const userExist_Email = await User.findOne({ email });
  const userExist_Phone = await User.findOne({ phone });

  if (userExist_Email) {
    res.status(400);
    throw new Error("Email has already been registered!");
  }

  if (userExist_Phone) {
    res.status(400);
    throw new Error("Phone number has already been registered!");
  }

  //encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  //Generate a token for the user
  const token = generateToken(user._id);
  //send HTTP Only Cookie to front-end or client
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 10),
    sameSite: "none",
    secure: true,
  });
  //successfull registration of an user
  if (user) {
    const { _id, name, email, phone } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//login controller user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email or password");
  }

  //Check if user exist
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("No user found with this email");
  }

  //check if password is correct
  const PasswordIsCorrect = await bcrypt.compare(password, user.password);

  if (!PasswordIsCorrect) {
    res.status(400);
    throw new Error("Password incorrect please try again");
  }
  //Generate a token for the user
  const token = generateToken(user._id);
  //send HTTP Only Cookie to front-end or client
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 10),
    sameSite: "none",
    secure: true,
  });
  if (user && PasswordIsCorrect) {
    const { _id, name, email, phone } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), //we just expired cookie
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Successfully logged out!",
  });
});

module.exports = { registerUser, loginUser, logoutUser };
