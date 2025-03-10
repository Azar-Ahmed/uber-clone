import User from '../models/user.model.js'
import {createUser} from '../services/user.service.js'
import {validationResult} from 'express-validator'

export const registerUser = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password} = req.body;
    
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready)  return res.status(400).json({success: false, message: 'User already exist' });
    
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        firstName :  fullName.firstName, 
        lastName : fullName.lastName, 
        email, 
        password: hashedPassword
    })

    const token = user.generateAuthToken();

    const userObject = user.toObject();
    delete userObject.password;
    res.status(201).json({token, user: userObject});
}