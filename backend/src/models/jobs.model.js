import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
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
    company: {
        type: String,
        required: [true, "Company is required"],
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
        ref: "College",
    },
    college:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
   link: {
        type : String,
        required : [true , " application link is  requried"],
        trim : true,
    }
});

export const Job = mongoose.model("Job", jobSchema);