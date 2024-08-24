import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollno:{
        type: Number,
        required: [true, "rollno is required"],
        unique: true,
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ["alumni", "student","collage"],
        default: "student",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    collage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collage",
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
    },
});

export const Student = mongoose.model("Student", studentSchema);