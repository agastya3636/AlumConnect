import {Message} from '../models/message.model.js';

export function SaveMessage(message, username, room){
    const newMessage = new Message({
        message,
        username,
        room
    });

    return newMessage.save();
}


export function GetMessage(room){
    return Message.find({ room });
}