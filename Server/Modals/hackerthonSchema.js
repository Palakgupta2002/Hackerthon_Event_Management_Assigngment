import mongoose, { Schema } from "mongoose";


const hackerthonSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    organizerEmail:{
        type:String,
    },
    company:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description: { 
        type: String,
        required: true
    },
    status:{ 
        type: String, 
        enum: ['upcoming', 'in-progress', 'completed'], 
        required: true
    },
    
})

export default mongoose.model("hackerthonSchema",hackerthonSchema)