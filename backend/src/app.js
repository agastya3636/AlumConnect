import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routerAlumni from './routes/alumni.routes.js'
import routerJobs from './routes/jobs.routes.js'
import routerEvent from './routes/events.router.js'
import routerCollege from './routes/college.routes.js'
import routerStudent from './routes/student.routes.js'


dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/alumni", routerAlumni);
app.use("/jobs", routerJobs);
app.use("/events", routerEvent);
app.use("/college", routerCollege);
app.use("/student",routerStudent);


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

export default app 