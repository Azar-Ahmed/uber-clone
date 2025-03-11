import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const CaptainSchema = new mongoose.Schema({

    fullName: {
        firstName: {type: String, required: true, minLength: [3, 'First name must be at least 3 characters long']},
        lastName: {type: String, required: true, minLength: [3, 'Last name must be at least 3 characters long']}
    },
    email:{
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
        minLength: [5, 'Email Id must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true, 
        select: false
    },
    socketId: {
        type: String,   
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
       color:{
        type: String,
        required: true,
        minLength: [3, 'Color name must be at least 3 characters long']
       },
       plate:{
        type: String,
        required: true,
        minLength: [3, 'Color name must be at least 3 characters long']
       },
       capacity:{
        type: Number,
        required: true,
        minLength: [1, 'Capacity name must be at least 1']
       },
       vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'bike', 'auto']
       }
    },

    location: {
        lat: {
            type: Number
        },
        log: {
            type: Number
        }
    }
    
}, {timestamps: true})

CaptainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}

CaptainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

CaptainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);        
}

const Captain = mongoose.model('captain', CaptainSchema)
export default Captain;