import { asyncHandeller } from "../utils/asyncHandeller.js"
import { Alumni } from "../models/alumni.model.js";


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
        const { _id } = req.body.user;
        const user = await Alumni.findById(_id);
        res.status(200).json({
            success: true,
            user: user,
            message: "Alumni Profile endpoint hit"
        });
    }
);

const alumniUpdateProfile = asyncHandeller(
    async (req, res) => {
        console.log(req);
        const { _id } = req.body.user;

        const user = await Alumni.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user: user,
            message: "Alumni Update Profile endpoint hit"
        });
    }
);

const alumniDeleteProfile = asyncHandeller(
    async (req, res) => {
        const { _id } = req.body.user;
        await Alumni.findByIdAndDelete(_id);
        res.status(200).json({
            success: true,
            message: "Alumni Delete Profile endpoint hit"
        });
    }
);

const getAlumni = asyncHandeller(
    async (req, res) => {
        const alumniList = await Alumni.find();
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