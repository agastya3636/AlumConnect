import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routerAlumni from './routes/alumni.routes.js'


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


app.get("/",
    (req, res) => {
        res.send("Hello World")
    }
)

export default app 