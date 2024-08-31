// import { Router } from "express";
import { College } from "../models/college.model.js";
import { asyncHandeller } from "../utils/asyncHandeller.js";

const collegeRegister = asyncHandeller(async (req, res) => {
    try{
    const { name,email,username,password,role } = req.body;
    if (!name||name.trim()==="") {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!email||email.trim()==="") {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password||password.trim()==="") {
        return res.status(400).json({ message: ' Password is required' });
    }
    if (!role||role.trim()==="") {
        return res.status(400).json({ message: 'Role is required' });
    }
    const userExist1 = await College.findOne({ email });
    const userExist2 = await College.findOne({ username });
    if (userExist1 || userExist2) {
        return res.status(400).json({ message: "Email or username already exists" });
    }
    const newCollege = new College({
        name,
        email,
        username,
        password,
        role:"college"
    });

    const userCreated = await newCollege.save();

    const token = await userCreated.generateToken();
   
    res.status(200).json({
        success: true,
        token: token,
        userId: userCreated._id.toString(),
        email: userCreated.email,
        username: userCreated.username,
        password:userCreated.password,
        message: "College Register endpoint hit",
    });
}
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const collegeLogin = asyncHandeller(
    async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username ||username.trim()==='') {
                return res.status(400).json({ message: "Username  are required" });
            }
            if (!password||password.trim()==='') {
                return res.status(400).json({ message: " password are required" });
            }
            const userExist = await College.findOne({ username });
    
            if (!userExist) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
    
            const isMatch = await userExist.verifyPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Username or password is incorrect" });
            }
    
            // Generate token
            const token = await userExist.generateToken();
    
            // Store cookies
            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
    
            // Send token
            res.status(200).cookie("token", token, options).json({
                success: true,
                message: "College Login endpoint hit",
                token: token,
                userId: userExist._id.toString(),
                username: userExist.username,
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

const collegeProfileUpdate = asyncHandeller(
    async (req, res) => {
        res.status(200).json({
            success: true,
            message: "College Profile endpoint hit",
        });
    }
);

const getCollegeById = asyncHandeller(
    async (req, res) => {
        const college = await College.findById(req.params.id);
        res.status(200).json({
            success: true,
            college: college,
            message: "College fetched successfully",
        });
    }
);

const deleteCollege = asyncHandeller(
    async (req, res) => {
        const college = await College.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            college: college,
            message: "College deleted successfully",
        });
    }
);

const getCollege = asyncHandeller(
    async (req, res) => {
        const colleges = await College.find();
        res.status(200).json({
            success: true,
            collages: collages,
            message: "Collages fetched successfully",
        });
    }
);

export {
    collegeRegister,
    collegeLogin,
    collegeProfileUpdate,
    getCollegeById,
    deleteCollege,
    getCollege
};

