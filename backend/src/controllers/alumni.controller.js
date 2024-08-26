import { asyncHandeller } from "../utils/asyncHandeller.js"
import { Job } from "../models/jobs.model.js";


const alumniRegister = asyncHandeller(
    async (req, res) => {
        
        
    }
)

const alumniLogin = asyncHandeller(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
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
            message: "Alumni Login endpoint hit",
        });
        
        
    }
);

const alumniProfile = asyncHandeller(
    async (req, res) => {
        const { _id } = req.user;
        const user = await Alumni.findById(_id);
        res.status(200).json({
            success: true,
            user: user,
            message: "Alumni Profile endpoint hit",
        });
    }
);

const alumniUpdateProfile = asyncHandeller(
    async (req, res) => {
        const { _id } = req.user;
        const user = await Alumni.findByIdAndUpdate(
            _id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user: user,
            message: "Alumni Update Profile endpoint hit",
        });
    }
);



export {
    alumniRegister,
    alumniLogin,
    alumniProfile,
    alumniUpdateProfile,
}