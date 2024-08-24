import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    collage:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collage",
    },
});

export const Forum = mongoose.model("Forum", forumSchema);