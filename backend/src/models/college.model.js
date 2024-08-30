import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
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
        enum: ["alumni", "student", "college"],
        default: "college",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});


collegeSchema.pre("save", async function(next) {
    const college = this;
    if (!college.isModified("password")) {
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(college.password, saltRound);
        college.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});
collegeSchema.methods.verifyPassword=async function (password) {
   
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch; 
}

collegeSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,

        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });
    } catch (error) {
        console.error(error);
    }
};

export const College = mongoose.model("College", collegeSchema);
