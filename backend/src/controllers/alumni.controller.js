import { asyncHandeller } from "../utils/asyncHandeller.js"
import { Alumni } from "../models/alumni.model.js";
import bcrypt from "bcryptjs";


const alumniRegister = asyncHandeller(
    async (req, res) => {
        
        const { name, email, username, password,role, collage, department, batch, linkedinlink, twitterlink, githublink, yearofpassing } = req.body;

        if (!name || name.trim()==="") {
            return res.status(400).json({ message: "name is required" });
        }
        if ( !email || email.trim()==="") {
            return res.status(400).json({ message: "email is required" });
        }
        if (!username || username.trim()==="") {
            return res.status(400).json({ message: "username is required" });
        }
        if ( !password || password.trim()==="") {
            return res.status(400).json({ message: "password is required" });
        }
        if ( !role || role.trim()==="") {
            return res.status(400).json({ message: "role is required" });
        }
        if ( !yearofpassing) {
            return res.status(400).json({ message: "year of passing  is required" });
        }
       

        const userExist1 = await Alumni.findOne({ email });
        const userExist2 = await Alumni.findOne({ username });
        if (userExist1 || userExist2) {
            return res.status(400).json({ message: "Email or username already exists" });
        }
        const alumni = new Alumni({
            name,
            email,
            username,
            password,
            collage,
            department,
            batch,
            linkedinlink,
            twitterlink,
            githublink,
            yearofpassing,
        });

        await alumni.save();

        const token = await alumni.generateToken();

        res.status(201).json({
            success: true,
            token: token,
            userId: alumni._id.toString(),
            password:alumni.password,
            email: alumni.email,
            username: alumni.username,
            role: alumni.role,
            collage:alumni.collage,
            department:alumni.department,
            batch:alumni.batch,
            message: "Alumni registered successfully",
        });
    }
)

const alumniLogin = asyncHandeller(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email||email.trim()==="" ) {
            return res.status(400).json({ message: "Email are required" });
        }
        if ( !password||password.trim()==="") {
            return res.status(400).json({ message: "password are required" });
        }
        const userExist = await Alumni
            .findOne({ email })
            .select("+password");
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await userExist.verifyPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email or password is incorrect" });
        }
        const token = await userExist.generateToken();
        res.status(200).json({
            success: true,
            token: token,
            userId: userExist._id.toString(),
            email: userExist.email,
            username: userExist.username,
            role: userExist.role,
            message: "Alumni Login endpoint hit"
        });
        
        
    }
);

const alumniProfile = asyncHandeller(
    async (req, res) => {
        const { userId } = req.user;
        const user = await Alumni
            .findById(userId)
        res.status(200).json({
            success: true,
            user: user,
            message: "Alumini Profile endpoint hit",
        });
    }
);

const alumniUpdateProfile = asyncHandeller(
    async (req, res) => {
        const { userId } = req.user;
        const updateData = { ...req.body };
    
       
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
    
       
        const user = await Alumni.findByIdAndUpdate(userId, updateData, { new: true });
    
        res.status(200).json({
            success: true,
            user: user,
            message: "Alumni Update Profile endpoint hit"
        });
    }
);

const alumniDeleteProfile = asyncHandeller(
    async (req, res) => {
        const { userId } = req.user;

        // Find and delete the user profile
        const deletedUser = await Alumni.findByIdAndDelete(userId);
    
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: "Alumni Delete Profile endpoint hit"
        });
    }
);

const getAlumni = asyncHandeller(
    async (req, res) => {
         const batch = req.query.batch;
      
        const yearofpassing = req.query.yearofpassing;

        // Find alumni by year of passing
        const alumniList = await Alumni.find();
    
        if (alumniList.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No alumni found for the given year of passing",
            });
        }
    
        res.status(200).json({
            success: true,
            alumni: alumniList,
            message: "Alumni fetched successfully",
        });
    }
);



export {
    alumniRegister,
    alumniLogin,
    alumniProfile,
    alumniUpdateProfile,
    alumniDeleteProfile,
    getAlumni,
}