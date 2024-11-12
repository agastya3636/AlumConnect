import { Server } from 'socket.io';
import {SaveMessage} from '../controllers/message.controller.js';
import {GetMessage} from '../controllers/message.controller.js';

const setupSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'https://sih-2024-7ben.vercel.app',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    const CHAT_BOT = 'ChatBot';
    let chatRoom = '';
    let allUsers = [];

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('check_rooms', ({ alumniUsername }) => {
            const rooms = Array.from(io.sockets.adapter.rooms.keys()).filter(room => room.includes(alumniUsername));
            rooms.forEach(room => {
                console.log(`${alumniUsername} joined the room: ${room}`);
                socket.emit('join_chat', { room });
                io.to(room).emit('alumni_joined', { room, alumniUsername });
                io.to(room).emit('join_room', { alumniUsername, room });
            });
        });

        socket.on('join_room', async (data) => {
            const { studentUsername, room } = data;
            const chatHistory = await GetMessage(room);
            socket.join(room);

            socket.emit('chat_history', chatHistory);

            let __createdtime__ = Date.now();
            socket.to(room).emit('receive_message', {
                message: `${studentUsername} has joined the chat!`,
                sender: CHAT_BOT,
                __createdtime__
            });
            socket.emit('receive_message', {
                message: `Welcome ${studentUsername}`,
                sender: CHAT_BOT,
                __createdtime__
            }); 

            socket.emit('join_chat', { room: room });
            console.log(`${studentUsername} joined room: ${room}`);
            
            io.to(room).emit('notification', { message: `${studentUsername} has joined the chat`});
        });

        socket.on('send_message', async (data) => {
            const { room, message, username, __createdtime__ } = data;

            io.in(room).emit('receive_message', {
                message,
                sender: username,
                __createdtime__
            });

            await SaveMessage(message, username, room);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

};

export default setupSocketIO;
