import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler.js';
import  authRoutes from './routes/auth.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
const app=express();
dotenv.config();

import ideasRouter from './routes/ideas.js';
const port = process.env.PORT; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/ideas', ideasRouter);
app.use('/api/auth', authRoutes);
app.use(errorHandler);
app.use(cookieParser())
///404 callback
///connect to MongoDb
connectDB();
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    ///.json({ message: 'Route not found' });
    next(error);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
///MongoDB connection