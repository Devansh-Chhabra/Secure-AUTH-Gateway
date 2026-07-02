import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"

const app = express();
const PORT = process.env.PORT || 3000
const __dirname = path.resolve();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",authRoutes)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/auth-gateway/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/', 'auth-gateway/dist', 'index.html'));
    });
}

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on PORT: ${PORT}`);
})