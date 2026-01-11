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
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:false,
            default:1
        },
        genre:{
            type:[String],
            required:true,
        },
        tags:{
            type:[String],
            required:false,
            default:["general"]
        },
        description:{
            type:String,
            required:false,
            default:"general"

        },
        quantity:{
            type:Number,
            required:false,
            default:1
        },
        
    }
   
    // hackathon day
);
export const Book = mongoose.model( 'Book', bookSchema);