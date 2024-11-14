import { Project } from "../models/project.model.js";
import { asyncHandeller } from "../utils/asyncHandeller.js";

const createProject = asyncHandeller(async (req, res) => {
    try {
        const {
            title, description, githublink
        } = req.body;
        if (!title || title.trim() == '') {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        if (!githublink || githublink.trim() == '') {
            return res.status(400).json({
                success: false,
                message: "Githublink is required"
            });
        }

        const project = new Project({
            title, description, githublink
        });
        await project.save();
        res.status(201).json({
            success: true,
            data: project
        });
    }
    catch (e)
    {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
    
});

const getProjects = asyncHandeller(async (req, res) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        data: projects
    });
});

const getProjectById = asyncHandeller(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }
    res.status(200).json({
        success: true,
        data: project
    });
});

export { getProjectById, getProjects, createProject };