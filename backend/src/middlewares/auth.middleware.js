import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
import Captain from '../models/captain.model.js';

import BlacklistToken from '../models/blacklistToken.model.js';

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token) return res.status(401).json({message: "Unauthorized!"})
     
     const isBlackListed = await BlacklistToken.findOne({token});
     if(isBlackListed) return res.status(401).json({message: "Unauthorized!"})   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id);
        req.user = user;
        return next();

    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized",});
    }
}

export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token) return res.status(401).json({message: "Unauthorized!"})
    
    const isBlackListed = await BlacklistToken.findOne({token});
    if(isBlackListed) return res.status(401).json({message: "Unauthorized!"})   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await Captain.findById(decoded._id);
        req.captain = captain;
        return next();

    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized",});
    }    
}
