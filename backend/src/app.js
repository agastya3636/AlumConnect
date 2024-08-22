import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


app.get("/",
    (req, res) => {
        res.send("Hello World")
    }
)

export default app 