import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import NotesRoutes from "./routes/NotesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

import { connectDB } from "./config/db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use(express.json())
app.use(rateLimiter);
app.use('/api/notes', NotesRoutes)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running on PORT: http://localhost:5001")
    })
})