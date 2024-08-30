import { Student } from "../models/student.model.js";
import { asyncHandeller } from "../utils/asyncHandeller.js";
import bcrypt from "bcryptjs";


const studentRegister = asyncHandeller(async (req, res) => {
    try {
        const { rollno, fullname, email, username, password, college, department, batch } = req.body;
       
        if(!rollno|| rollno.trim()===""){

            return res.status(400).json({
                success: false,
                message:"Roll No is required"
            });
        }

        if(!name|| name.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Fullname is required"
            });
        }

        if(!email || email.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Email is required"
            });
        }

        if(!username || username.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"User name is required"
            });
        }

        if(!password ){

            return res.status(400).json({
                success: false,
                message:"Password is required"
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

        if(!batch || batch.trim() === ""){

            return res.status(400).json({
                success: false,
                message:"Batch is required"
            });
        }
      


        const userExist1 = await Student.findOne({ email });
        const userExist2 = await Student.findOne({ username });
        if (userExist1 || userExist2) {
            return res.status(400).json({ message: "Email or username already exists" });
        }
        const newStudent = new Student({
            rollno,
            name,
            email,
            username,
            password,
            college,
            department,
            batch
        });

        const userCreated = await newStudent.save();

        const token = await userCreated.generateToken();

        res.status(200).json({
            success: true,
            token: token,
            userId: userCreated._id.toString(),
            email: userCreated.email,
            username: userCreated.username,
            password: userCreated.password,
            collage:userCreated.collage,
            batch:userCreated.batch,
            department:userCreated.department,
            message: "Student Register endpoint hit"
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

);

const studentLogin = asyncHandeller(
    async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const userExist = await Student.findOne({ username });

            if (!userExist) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isMatch = await userExist.verifyPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Username or password is incorrect" });
            }

            const token = await userExist.generateToken();
            res.status(200).json({
                success: true,
                token: token,
                userId: userExist._id.toString(),
                email: userExist.email,
                username: userExist.username,
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
            .findById(_id)
            .populate("college")
            .populate("department")
            .populate("batch");
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
