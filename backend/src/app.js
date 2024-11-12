import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import setupSocketIO from './sockets/index.js'

import routerAlumni from './routes/alumni.routes.js'
import routerJobs from './routes/jobs.routes.js'
import routerEvent from './routes/events.router.js'
import routerCollege from './routes/college.routes.js'
import routerForums from './routes/forums.routes.js'
import routerStudent from './routes/student.routes.js'


dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/alumni", routerAlumni);
app.use("/api/jobs", routerJobs);
app.use("/api/events", routerEvent);
app.use("/api/college", routerCollege);
app.use("/api/forums", routerForums);
app.use("/api/student", routerStudent);

const server = http.createServer(app);
const io = setupSocketIO(server);

app.get("/",
    (req, res) => {
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
    }
)

export default server; 