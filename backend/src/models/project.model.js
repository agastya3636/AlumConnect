import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    githublink: {
        type: String,
        trim: true,
        unique: true,
    }
});

export const Project = mongoose.model("Project", projectSchema);