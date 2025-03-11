import dotenv from "dotenv";
import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectToDB from './config/db.js'
dotenv.config();
import userRoutes from './routes/user.route.js'


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

export default app;