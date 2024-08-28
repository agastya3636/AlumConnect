import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
        default:Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    // posted_by: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "College",
    // },
    // college:
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "College",
    // },
});

export const Event = mongoose.model("Event", eventSchema);