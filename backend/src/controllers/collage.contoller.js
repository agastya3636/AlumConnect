// import { Router } from "express";
// import { Collage } from "../models/collage.model.js";
import { asyncHandeller } from "../utils/asyncHandeller.js";

const collageRegister = asyncHandeller(async (req, res) => {
   
    res.status(200).json({
        success: true,
        message: "Collage Register endpoint hit",
    });
});

const collageLogin = asyncHandeller(
    async (req, res) => {
        res.status(200).json({
            success: true,
            message: "Collage Login endpoint hit",
        });
    }
);

const collageProfileUpdate = asyncHandeller(
    async (req, res) => {
        res.status(200).json({
            success: true,
            message: "Collage Profile endpoint hit",
        });
    }
);

export {
    collageRegister, collageLogin, collageProfileUpdate
};

