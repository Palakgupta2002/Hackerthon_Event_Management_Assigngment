import mongoose, { Schema } from "mongoose";

const registrationSchema=new Schema({
    hackerthonId:{
        type:String,
        required:true
    },
    participantEmail:{ 
        type: String, 
        required: true 
    },
    name:{ 
        type: String, 
        required: true 
    },
    phone:{ 
        type: String, 
        required: true 
    },
    experience:{ 
        type: Number, 
        required: true 
    },
    skills:{ 
        type: [String], 
        required: true 
    },
    registeredAt:{ 
        type: Date, 
        default: Date.now
    },

})
export default mongoose.model("registrationSchema",registrationSchema)