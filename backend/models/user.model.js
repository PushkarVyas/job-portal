import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        default: "student"
    },
    profile:{
        bio:{
            type: String,
            required: false
        },
        skills: [{type: String}],
        resume: {type: String},
        resumeOriginalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},  
        profilephoto: {type: String, default: ""}
    },
} , {timestamps: true});

export const User = mongoose.model("User", userSchema);