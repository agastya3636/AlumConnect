import forums from '../models/forums.model.js'
import asyncHandeller from '../utils/asyncHandeller.js'

const createForum = asyncHandeller(async (req, res) => {
    try {
        const { title, description, tags, createdBy } = req.body;
        if (!title || !description || !tags || !createdBy) {
            return res.status(400).json({ message: 'Title is required, Description is required, Tags is required, CreatedBy is required' });
        }
        const newForum = new forums({
            title,
            description,
            tags,
            createdBy,
        });

        const forumCreated = await newForum.save();

        res.status(200).json({
            success: true,
            forum: forumCreated,
            message: "Forum created successfully",
        });
    }
    catch (error) {
        console.error("Forum creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

);

const getForums = asyncHandeller(
    async (req, res) => {
        const forumsList = await forums.find();
        res.status(200).json({
            success: true,
            forums: forumsList,
            message: "Forums fetched successfully",
        });
    }
);

const getForumById = asyncHandeller(
    async (req, res) => {
        const forum = await forums.findById(req.params.id);
        res.status(200).json({
            success: true,
            forum: forum,
            message: "Forum fetched successfully",
        });
    }
);

const updateForum = asyncHandeller(
    async (req, res) => {
        const forum = await forums.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            forum: forum,
            message: "Forum updated successfully",
        });
    }
);

const deleteForum = asyncHandeller(
    async (req, res) => {
        const forum = await forums.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            forum: forum,
            message: "Forum deleted successfully",
        });
    }
);

export { createForum, getForums, getForumById, updateForum, deleteForum }
