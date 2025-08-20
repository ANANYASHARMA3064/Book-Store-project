import express from "express";
import {PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookMode.js"
const app =express(); 
app.get('/',(req,res)=>{
    console.log(req)
    return res.status(200).send("welcome to MERN stack")
})
// middlewear for parsing request body 
app.use(express.json());
// Route for saving a new book 
app.post('/books',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "send all required fields"
            })
        }
        const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear
    }
    const book =await Book.create(newBook)
    return response.status(201).send(book)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
    
n

})

mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database')
    app.listen(PORT,()=>{
    console.log(`app is listening on port:${PORT}`);
})
}).catch((error)=>{
    console.log(error)
})