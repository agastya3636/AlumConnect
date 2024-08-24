import { Event } from "../models/events.model.js";
import { Router } from "express";

import { asyncHandeller } from "../utils/asyncHandeller.js";

const router = Router();

const getEvents = asyncHandeller(
    async (req, res) => {
        const events = await Event.find();
        res.status(200).json({
            success: true,
            events,
        });
    }
);


const EventPosts = asyncHandeller(
    async (req, res) => {
        const { title,
            description,
            location,
            // posted_by,
            date,
            
            // collage
        } = req.body;

        const event = new Event({
            title,
            description,
            location,
            // posted_by,
            date,
            
            // collage
        });
        await event.save();
        res.status(200).json({
            success: true,
            message: "Event Post endpoint hit",
        });
    }
);

const getEventPostById = asyncHandeller(
    async (req, res) => {
        const event = await Event.findById(req.params.id);
        res.status(200).json({
            success: true,
            event,
        });
    }
);

const updateEventPostById = asyncHandeller(
    async (req, res) => {
        const event = await Event.findByIdAndUpdate(req
            .params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            event,
        });
    }
);

const deleteEventPostById = asyncHandeller(
    async (req, res) => {
        const event = await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            event,
        });
    }
);


export {
    getEvents, EventPosts, getEventPostById, updateEventPostById, deleteEventPostById
};