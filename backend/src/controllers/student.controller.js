import { Student } from "../models/student.model";
import { asyncHandeller } from "../utils/asyncHandeller";

const studentRegister = asyncHandeller(async (req, res) => {
    try {
        const { rollno, fullname, email, username, password, collage, department, batch } = req.body;
        if (!rollno || !fullname || !email || !username || !password || !collage || !department || !batch) {
            return res.status(400).json({ message: 'Rollno is required, Fullname is required, Email is required, Username is required, Password is required, Collage is required, Department is required, Batch is required' });
        }
        const userExist1 = await Student.findOne({ email });
        const userExist2 = await Student.findOne({ username });
        if (userExist1 || userExist2) {
            return res.status(400).json({ message: "Email or username already exists" });
        }
        const newStudent = new Student({
            rollno,
            fullname,
            email,
            username,
            password,
            collage,
            department,
            batch,
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
            message: "Student Register endpoint hit",
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
                message: "Student Login endpoint hit",
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

const studentProfile = asyncHandeller(
    async (req, res) => {
        const { _id } = req.user;
        const user = await Student
            .findById(_id)
            .populate("collage")
            .populate("department")
            .populate("batch");
        res.status(200).json({
            success: true,
            user: user,
            message: "Student Profile endpoint hit",
        });
    }
);


const studentUpdateProfile = asyncHandeller(
    async (req, res) => {
        const { _id } = req.user;
        const user = await Student.findByIdAndUpdate(_
            id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user: user,
            message: "Student Update Profile endpoint hit",
        });
    }
);

export { studentRegister, studentLogin, studentProfile, studentUpdateProfile };
