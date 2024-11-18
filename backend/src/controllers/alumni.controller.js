import { asyncHandeller } from "../utils/asyncHandeller.js"
import { Alumni } from "../models/alumni.model.js";
import bcrypt from "bcryptjs";


const alumniRegister = asyncHandeller(
    async (req, res) => {
        console.log(req);
        
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
    
            // if (!customSkill || customSkill.trim() === "") {
            //     return res.status(400).json({
            //         success: false,
            //         message: "Custom skill is required"
            //     });
            // }
    
            // if (!customInterest || customInterest.trim() === "") {
            //     return res.status(400).json({
            //         success: false,
            //         message: "Custom interest is required"
            //     });
            // }
    
            // if(!college|| college.trim() === ""){
    
            //     return res.status(400).json({
            //         success: false,
            //         message:"College is required"
            //     });
            // }
    
            // if(!department|| department.trim() === ""){
    
            //     return res.status(400).json({
            //         success: false,
            //         message:"Department is required"
            //     });
            // }
            // Check if user already exists
        const userExist = await Alumni.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const alumni = new Alumni({
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
            // customSkill,
            // customInterest,
            // college,
            department:"cse",
        });

        await alumni.save();

        const token = await alumni.generateToken();

         // Store cookies
         const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        };

        res.status(200).cookie("token", token, options).json({
            success: true,
            token: token,
            userId: alumni._id.toString(),
            password: alumni.password,
            
            email: alumni.email,
            role: alumni.role,
            college:alumni.college,
            department:alumni.department,
            batch:alumni.batch,
            message: "Alumni registered successfully",
        });
      }  catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({
                message: "Internal server error",
                'eat':error
             });
        }
});

const alumniLogin = asyncHandeller(
    async (req, res) => {
        console.log(req);
        const { email, password,role } = req.body;
        if (!email||email.trim()==="" ) {
            return res.status(400).json({ message: "Email are required" });
        }
        if ( !password||password.trim()==="") {
            return res.status(400).json({ message: "password are required" });
        }
        if ( !role||role.trim()==="") {
            return res.status(400).json({ message: "role are required" });
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

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),  // Expires in 1 day
            httpOnly: true,  // Prevent access to cookie via JavaScript
            secure: process.env.NODE_ENV === 'production',  // Only secure cookies in production
            sameSite: 'None',  // Allow cross-origin cookies
            };

            res.status(200).cookie("token", token, options).json({
              success: true,
              token: token,
                userId: userExist._id.toString(),
                name: userExist.name,
                image: userExist.image,
                bio: userExist.bio,
                education: userExist.education,
                email: userExist.email,
                role: userExist.role,
                socialLinks: userExist.socialLinks,
                batch: userExist.batch,
                interests: userExist.interests,
                skills: userExist.skills,
                password: userExist.password,
                message: "Alumni Login endpoint hit",
            });

        
        
    }
);

const alumniProfile = asyncHandeller(
    async (req, res) => {
        const { userId } = req.user;
        const user = await Alumni
            .findById(userId)
            .populate("college")
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
    
       
        // if (updateData.password) {
        //     const salt = await bcrypt.genSalt(10);
        //     updateData.password = await bcrypt.hash(updateData.password, salt);
        // }
    
       
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
      
        // const yearofpassing = req.query.yearofpassing;

        // Find alumni by year of passing
        const alumniList = await Alumni.find({
            batch: batch
        });
    
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