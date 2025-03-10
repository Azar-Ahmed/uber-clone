import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {type: String, required: true, minLength: [3, 'First name must be at least 3 characters long']},
        lastName: {type: String, required: true, minLength: [3, 'Last name must be at least 3 characters long']}
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        minLength: [5, 'Email Id must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true, 
        select: false
    },
    socketId: {
        type: String,   
    }
}, {timestamps: true})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);        
}

const User = mongoose.model('user', userSchema)
export default User;