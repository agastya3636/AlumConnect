import { asyncHandeller } from "../utils/asyncHandeller.js"
import { Job } from "../models/jobs.model.js";

const JobPosts = asyncHandeller(
    async (req, res) => {
        const { title,
            description,
            location,
            salary,
            postedBy,
            postedOn,
            company
        } = req.body;

        const job = new Job({
            title,
            description,
            location,
            salary,
            postedBy,
            postedOn,
            company
        });
        await job.save();
        res.status(200).json({
            success: true,
            message: "Job Post endpoint hit",
        });
       
});


export { JobPosts };