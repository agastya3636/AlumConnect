import { Server } from 'socket.io'

const setupSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:8000',
            methods: ['GET', 'POST']
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: $(socket.id)`);
    

    socket.on('message', (msg) => {
        console.log('Message received:', msg);
    });
    socket.on('disconnect', () => {
        console.log(`User disconnected: $(socket.id)`);
    });
});
    return io;
};

export default setupSocketIO;