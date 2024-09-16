import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Message = mongoose.model('Message', messageSchema);