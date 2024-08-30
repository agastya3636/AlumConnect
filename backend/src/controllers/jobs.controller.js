import { asyncHandeller } from "../utils/asyncHandeller.js";

import { Job } from "../models/jobs.model.js";

const getJobs = asyncHandeller(
    async (req, res) => {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const jobs = await Job.find().limit(parseInt(limit));
        res.status(200).json({
            success: true,
            jobs,
        });
    }
);

const JobPosts = asyncHandeller(
    async (req, res) => {
        const { title,
            description,
            location,
            salary,
            postedBy,
            postedOn,
            company,
            link
        } = req.body;

        if(!title || title.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"title is required"
            });
        }

        if( !description || description.trim() === ""){

            return res.status(400).json({
                success: false,
                message:" Description is required "
            });
        }

        if( !location || location.trim() === ""){

            return res.status(400).json({
                success:false,
                message: " Location is required"
            });

        }

        if(!company || company.trim() === ""){

            return res.status(400).json({
                success:false,
                message: " Comapany is required"
            });

        }

        if(!link || link.trim() === ""){

            return res.status(400).json({
                success: false,
                message: " application link is required"
            });
        }

        try{
            const job = new Job({
                title,
                description,
                location,
                salary,
                postedBy,
                postedOn,
                company,
                link
            });

            await job.save();
            res.status(200).json({
                success: true,
                message: "Job Post endpoint hit",
            });
        }
       catch(error) {
        res.status(500).json({
            success:false,
            message : "Failed to register the Job post"
        });
       }
       
});

const getJobPostById = asyncHandeller(
    async (req, res) => {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job,
            message: "Job fetched successfully",
        });
    }
);

const updateJobPostById = asyncHandeller(
    async (req, res) => {
        const job = await Job.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            job,
            message: "Job updated successfully",
        });
    }
);

const deleteJobPostById = asyncHandeller(
    async (req, res) => {
        const job = await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            job,
            message: "Job deleted successfully",
        });
    }
);



export {
    getJobs,
    JobPosts,
    getJobPostById,
    updateJobPostById,
    deleteJobPostById,
};
