import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const alumniSchema = new mongoose.Schema({
    name: {
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
        default: "alumni",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    collage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collage",
    },
    department: {
        type: String,
    },
    batch: {
        type:String,
    },
    linkedinlink: {
        type: String,
        trim: true,
    },
    twitterlink: {
        type: String,
        trim: true,
    },
    githublink: {
        type: String,
        trim: true,
    },
    yearofpassing: {
        type: Number,
        required:true,
    },
});

alumniSchema.pre("save", async function(next) {
    const alumni = this;
    if (!alumni.isModified("password")) {
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(alumni.password, saltRound);
        alumni.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

alumniSchema.methods.verifyPassword=async function (password) {
    
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch; 
}
alumniSchema.methods.generateToken = async function() {
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

export const Alumni = mongoose.model("Alumni", alumniSchema);