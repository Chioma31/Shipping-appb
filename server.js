import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import connectDB from './config/connectDB.js';
import users from './routes/api/user.js'
import admin from './routes/api/admin.js'
import cors from 'cors';

dotenv.config()

connectDB()


const app = express() 

app.use(cors({ origin: '*' }))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use ('/api/users', users)
app.use ('/api/admin', admin)

const port = process.env.PORT || 5001

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))  