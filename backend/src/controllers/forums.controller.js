import { Forum } from '../models/forums.model.js'
import { asyncHandeller } from '../utils/asyncHandeller.js'
import { mongoose } from 'mongoose';

const createForum = asyncHandeller(async (req, res) => {
    try {
        const { category, description, thread } = req.body;
        if (!category || !description || !thread) {
            return res.status(400).json({ message: 'Category, description and thread is required' });
        }
        const newForum = new Forum({
            category,
            description,
            thread
        });

        const savedForum = await newForum.save();

        res.status(201).json({
            success: true,
            forum: savedForum,
            message: "Forum created successfully",
        });
    }
    catch (error) {
        
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
);

const getForums = asyncHandeller(
    async (req, res) => {
        try {
            const forumsList = await Forum.find();
            res.status(200).json({
                success: true,
                forums: forumsList,
                message: "Forums fetched successfully",
            });
        }
        catch (error){
           
            res.status(500).json({
                message: 'Internal Server Error.',
                error: error.message
            });
        }
    }
);

const getForumById = asyncHandeller(
    async (req, res) => {
        try {
            const forum = await Forum.findById(req.params.id);
            if (!forum) {
                return res.status(404).json({ message: 'Forum not found'});
            }
            res.status(200).json({
                success: true,
                forum: forum,
                message: "Forum fetched successfully",
            });
        }
        catch (error) {
            
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
);

const updateForum = asyncHandeller(
    async (req, res) => {
        try {
            const forum = await Forum.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!forum){
                return res.status(404).json({
                    message: 'Forum not found'
                });
            }
            res.status(200).json({
                success: true,
                forum: forum,
                message: "Forum updated successfully",
            });
        }
        catch (error){
          
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
);

const deleteForum = asyncHandeller(
    async (req, res) => {
        try {
            const forum = await Forum.findByIdAndDelete(req.params.id);
            if (!forum){
                return res.status(404).json({ message: 'Forum not found'})
            }
            res.status(200).json({
                success: true,
                forum: forum,
                message: "Forum deleted successfully",
            });
        }
        catch (error){
            
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }
);

export { createForum, getForums, getForumById, updateForum, deleteForum }
