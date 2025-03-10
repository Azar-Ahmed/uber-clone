import mongoose from 'mongoose'

const connectToDB = () => {
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log('Connected to Database');
    }).catch(err => console.log(err));
}

export default connectToDB; 