import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import ideasRouter from "./routes/ideas.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Connect DB first
connectDB();

// Global middleware
app.use(cookieParser());
const allowedOrigins = [
  "https://ideas-git-main-tinegas-projects.vercel.app",
  "https://ideas-sooty.vercel.app/",
  "http://localhost:5174",

];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // for Postman or curl
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideasRouter);

// 404 Handler (should be before errorHandler)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

///Error Handler (always last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
