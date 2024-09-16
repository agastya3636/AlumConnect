import { Student } from "../models/student.model.js";
import { asyncHandeller } from "../utils/asyncHandeller.js";
import bcrypt from "bcryptjs";


const studentRegister = asyncHandeller(async (req, res) => {
    try {
        const {
            name, email, password, batch, role, image, education,
            skills, interests, bio, socialLinks, customSkill, customInterest,
            college, department
        } = req.body;

        // Validate required fields
        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Fullname is required"
            });
        }


        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        if (!batch || batch.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Batch is required"
            });
        }

        if (!role || role.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        if (!image || image.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Image URL is required"
            });
        }

        if (!education || education.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Education is required"
            });
        }

        if (!skills || !Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Skills are required"
            });
        }

        if (!interests || !Array.isArray(interests) || interests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Interests are required"
            });
        }

        if (!bio || bio.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Bio is required"
            });
        }

        if (!socialLinks || typeof socialLinks !== 'object' || !socialLinks.linkedin || !socialLinks.github || !socialLinks.twitter) {
            return res.status(400).json({
                success: false,
                message: "Social links are required"
            });
        }

        if (!customSkill || customSkill.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Custom skill is required"
            });
        }

        if (!customInterest || customInterest.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Custom interest is required"
            });
        }

        if(!college|| college.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"College is required"
            });
        }

        if(!department|| department.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Department is required"
            });
        }
        // Check if user already exists
        const userExist= await Student.findOne({ email });
       
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new student
        const newStudent = new Student({
            name,
            email,
            password,
            batch,
            role,
            image,
            education,
            skills,
            interests,
            bio,
            socialLinks,
            customSkill,
            customInterest,
            college,
            department
        });

        const userCreated = await newStudent.save();

        // Generate token
        const token = await userCreated.generateToken();

             // Store cookies
             const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.status(200).cookie("token", token, options).json({
            success: true,
            token: token,
            userId: userCreated._id.toString(),
            email: userCreated.email,
            image: userCreated.image,
            password: userCreated.password,
            batch: userCreated.batch,
            department: userCreated.department,
            message: "Student registered successfully"
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const studentLogin = asyncHandeller(
    async (req, res) => {
        try {
            const { email, password ,role} = req.body;

            if (!email|| !password||!role) {
                return res.status(400).json({ message: "email,password and role are required" });
            }
            const userExist = await Student.findOne({ email});

            if (!userExist) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isMatch = await userExist.verifyPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "email or password is incorrect" });
            }

            const token = await userExist.generateToken();

             // Store cookies
         const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
                success: true,
                token: token,
                userId: userExist._id.toString(),
                email: userExist.email,
                password:userExist.password,
                role: userExist.role,
                message: "Student Login endpoint hit"
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

const studentProfile = asyncHandeller(
    async (req, res) => {
        const { userId } = req.user;
        const user = await Student
            .findById(userId)
            .populate("college")
        res.status(200).json({
            success: true,
            user: user,
            message: "Student Profile endpoint hit",
        });
    }
);


const studentUpdateProfile = asyncHandeller(async (req, res) => {
    const { userId } = req.user;
    const updateData = { ...req.body };

   
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

   
    const user = await Student.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
        success: true,
        user: user,
        message: "Student Update Profile endpoint hit",
    });
});

export { studentRegister, studentLogin, studentProfile, studentUpdateProfile };
