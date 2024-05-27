import mongoose, { Schema } from "mongoose";

const registrationSchema=new Schema({
    hackerthon:{
        type:Schema.Types.ObjectId,
        ref:"hackerthonSchema",
        required:true
    },
    participant:{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name:{ 
        type: String, 
        required: true 
    },
    email:{ 
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