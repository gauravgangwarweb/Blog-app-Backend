import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const connecionString = process.env.DATABASE_URL

const connectToDatabase = async () => {
    try {
        await mongoose.connect(connecionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("😊 Database Connected 😊");
    } catch (error) {
        console.error('MongoDB connection error', error);
        throw error
    }
}

export default connectToDatabase