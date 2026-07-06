import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { Book } from "./models/bookMode.js";
import booksRoute from './Routes/booksRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send("welcome to MERN stack");
});
app.use('/', booksRoute);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('app connected to database')
  app.listen(process.env.PORT, () => {
    console.log(`app is listening on port:${process.env.PORT}`);
  })
}).catch((error) => {
  console.log(error)
});