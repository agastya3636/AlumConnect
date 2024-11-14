import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import setupSocketIO from './sockets/index.js'
import cookieParser from 'cookie-parser';
import routerAlumni from './routes/alumni.routes.js'
import routerJobs from './routes/jobs.routes.js'
import routerEvent from './routes/events.router.js'
import routerCollege from './routes/college.routes.js'
import routerForums from './routes/forums.routes.js'
import routerStudent from './routes/student.routes.js'
import { authenticateJWT } from './middlewares/authenticateJWT.js'

dotenv.config();

const app = express();

// Define the CORS options with your frontend URL
const corsOptions = {
    origin: process.env.CLIENT_URL,  // Make sure CLIENT_URL is set to the correct frontend URL
    credentials: true,  // Allow sending cookies with cross-origin requests
};

// Use the CORS middleware with the options defined above
app.use(cors(corsOptions));

// // Ensure preflight requests are handled for all routes
// app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/alumni", routerAlumni);
app.use("/api/jobs", authenticateJWT, routerJobs);
app.use("/api/events", authenticateJWT, routerEvent);
app.use("/api/college", authenticateJWT, routerCollege);
app.use("/api/forums", authenticateJWT, routerForums);
app.use("/api/student", authenticateJWT, routerStudent);

const server = http.createServer(app);
const io = setupSocketIO(server);

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to the Alumni API",
        routes: [
            "/alumni",
            "/jobs",
            "/events",
            "/college",
            "/student"
        ]
    })
});

export default server;
