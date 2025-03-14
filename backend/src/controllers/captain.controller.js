import { createCaptain } from "../services/captain.service.js";
import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlready = await Captain.findOne({ email });
    if (isCaptainAlready)
      return res
        .status(400)
        .json({ success: false, message: "Captain already exist" });

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });


    const token = captain.generateAuthToken();
    res.cookie('token', token);

    // Convert to plain object and remove password
    const captainObject = captain.toObject();
    delete captainObject.password;
    res.status(201).json({ token, captain: captainObject });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) return res.status(401).json({ success: false, message: "Invalid email or password!" });

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password!" });

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    // Convert to plain object and remove password
    const captainObj = captain.toObject();
    delete captainObj.password;
    
    res.status(200).json({token, captain: captainObj });

} catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const getCaptainProfile = async (req, res, next) => {
    try {
      res.status(200).json(req.captain);
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


  
export const captainLogout = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({message: "Logout successfully"});
  }