import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollno:{
        type: String,
        required: [true, "rollno is required"],
        unique: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ["alumni", "student","collage"],
        default: "student",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    collage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collage",
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
    },
});

studentSchema.pre("save", async function(next) {
    const student = this;
    if (!student.isModified("password")) {
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(student.password, saltRound);
        student.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

studentSchema.methods.verifyPassword=async function (password) {
    
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch; 
}
studentSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            username: this.username,

        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });
    } catch (error) {
        console.error(error);
    }
};


export const Student = mongoose.model("Student", studentSchema);