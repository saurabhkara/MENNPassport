import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/connectiondb.js";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;

const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  credential: true,
  optionsSucessStatus: 200,
};

//CORS policy
app.use(cors(corsOptions));

app.use(express.json());

app.use(passport.initialize());

app.use(cookieParser());

//Database connection
connectDB(DB_URL);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
