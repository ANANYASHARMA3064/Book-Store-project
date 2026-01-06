import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { Book } from "./models/bookMode.js"
import booksRoute from './Routes/booksRoutes.js'
import cors from "cors";

const app =express(); 
app.get('/',(req,res)=>{
    console.log(req)
    return res.status(200).send("welcome to MERN stack")
})
app.use(express.json());

app.use(cors())


app.use('/',booksRoute)
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('app connected to database')
    app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port:${process.env.PORT}`);
})
}).catch((error)=>{
    console.log(error)
})