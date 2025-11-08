import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app=express();
dotenv.config();


const port = process.env.PORT; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
// MongoDB connection