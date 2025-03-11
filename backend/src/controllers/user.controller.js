import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistToken from '../models/blacklistToken.model.js'
export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlready = await User.findOne({ email });
    if (isUserAlready)
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    // const token = user.generateAuthToken();

    // Convert to plain object and remove password
    const userObject = user.toObject();
    delete userObject.password;
    res.status(201).json({ user: userObject });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password!" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password!" });

    const token = user.generateAuthToken();
    res.cookie('token', token);

    // Convert to plain object and remove password
    const userObj = user.toObject();
    delete userObj.password;
    
    res.status(200).json({token, user: userObj });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
  }
};


export const userLogout = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  await BlacklistToken.create({ token });
  res.status(200).json({message: "Logout successfully"});
}