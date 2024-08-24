import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routerAlumni from './routes/alumni.routes.js'
import routerJobs from './routes/jobs.routes.js'
import routerEvent from './routes/events.router.js'
import routerCollage from './routes/collage.routes.js'


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
app.use("/collage", routerCollage);


app.get("/",
    (req, res) => {
        res.send("Hello World")
    }
)

export default app 