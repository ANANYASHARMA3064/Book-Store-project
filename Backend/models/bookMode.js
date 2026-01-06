import mongoose from "mongoose";
const bookSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
         publishYear:{
            type:String,
            required:true
        },
        price:{
            type:Int16Array,
            required:false
        },
        genre:{
            type:String,
            required:true,
        },
        tags:{
            type:String,
            required:false,
        },
        description:{
            type:String,
            required:false,

        },
        quantity:{
            type:Int32Array,
            required:false,
        },
        
    }
   
    
);
export const Book = mongoose.model( 'Book', bookSchema);