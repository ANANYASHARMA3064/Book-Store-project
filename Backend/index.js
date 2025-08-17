import express from "express";
import {PORT} from "./config.js"
const app =express(); 
app.get('/',(req,res)=>{
    console.log(req)
    return response.status(200).send("welcome to MERN stack")
})
app.listen(PORT,()=>{
    console.log(`app is listening on port:${PORT}`);
})