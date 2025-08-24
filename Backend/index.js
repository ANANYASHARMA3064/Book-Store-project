import express from "express";
import {PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookMode.js"
import booksRoute from './Routes/booksRoutes.js '
const app =express(); 
app.get('/',(req,res)=>{
    console.log(req)
    return res.status(200).send("welcome to MERN stack")
})
// middlewear for parsing request body 
app.use(express.json());
//Middlewear for handeling CORS POLICY 
//option-1:allow all domains
app.use(cors())
//option-2 :Allow custom 
app.use(CORS({
    origin:'https://localhost:4090',
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:['Content-Type']

}))
// Route for saving a new book 

app.use('/books',booksRoute)
mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database')
    app.listen(PORT,()=>{
    console.log(`app is listening on port:${PORT}`);
})
}).catch((error)=>{
    console.log(error)
})