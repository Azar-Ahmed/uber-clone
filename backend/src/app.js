import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectToDB from './config/db.js'
import userRoutes from './routes/user.route.js'
import captainRoutes from './routes/captain.route.js'

const app = express();

//Database Connection
connectToDB();

//Middlewares 
app.use(cors());
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.get('/', (req, res)=>{
    res.send(`Server is up!`);
})
app.use('/api/users', userRoutes)
app.use('/api/captain', captainRoutes)


export default app;