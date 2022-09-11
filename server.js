import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import connectDB from './config/db.js';
import users from './routes/api/user.js'

dotenv.config()

connectDB()


const app = express() 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use ('/api/users', users)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))  
