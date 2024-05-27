import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // minlength: [8, "Password must be at least 8 characters long"],
        // maxlength: [16, "Password cannot be more than 16 characters"]
    },
    role: {
        type: String,
        enum: ['participant', 'organizer'],
        required: true
    },
    phone: {
        type: Number,
    },
    experience: {
        type: Number,
    },
    skills: {
        type: [String]
    }
});

const User = mongoose.model("User", userSchema);
export default User;
