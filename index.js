import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectToDatabase from './dbConnection.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import cloudinaryRoute from './routes/imagesRoute.js'
import cors from 'cors'

connectToDatabase()

dotenv.config()
const PORT = 4000

const app = express()

app.use(cors())

app.use(express.json())
app.use('/api', userRoute)
app.use('/api', postRoute)
app.use('/api', cloudinaryRoute)

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})