import { Event } from "../models/events.model.js";
import { Router } from "express";

import { asyncHandeller } from "../utils/asyncHandeller.js";

const router = Router();

const getEvents = asyncHandeller(
    async (req, res) => {
        const limit = req.query.limit || 10;
        const events = await Event.find().sort({date: -1}).limit(parseInt(limit));
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
            
            // college
        } = req.body;

        if(!title || title.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"title is required"
            });
        }
        if(!description|| description.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Description is required"
            });
        }
        if(!location || location.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Location is required"
            });
        }
        if(!date || date.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Date is required"
            });
        }
    
        try{
            const event = new Event({
                title,
                description,
                location,
                date,
                // postedBy,
                //college
            });

            await event.save();
            res.status(200).json({
                success: true,
                message: "Event post endpoint hit",
            });
        }
       catch(error) {
            res.status(500).json({
                success:false,
                message : "Failed to register the Event"
            });
       }
    
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