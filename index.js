import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectToDatabase from './dbConnection'
import userRoute from './routes/userRoute'
import postRoute from './routes/postRoute'

connectToDatabase()

dotenv.config()
const PORT = 4000

const app = express()

app.use(express.json())
app.use('/api', userRoute)
app.use('/api', postRoute)

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})