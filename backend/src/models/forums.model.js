import { mongoose } from "mongoose";

const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    replies: [],
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
}, { _id: false });

const forumSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Web Technology', 'Data Science', 'Data Analytics', 'Machine Learning', 'Cybersecurity', 'Blockchain'],
        required: true
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    thread: threadSchema
}, { timestamps: true });

export const Forum = mongoose.model("Forum", forumSchema);
