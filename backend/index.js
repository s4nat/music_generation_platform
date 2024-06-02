//packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utilities
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Handle preflight requests
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
        res.status(200).send();
    }
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/files", fileRoutes);


app.get("/", (req, res) => {
    console.info("INFO: Server Started Successfully");
    res.json({ "message:": "Welcome to Wubble Test API" });
});


app.listen(port, () => console.log(`Server running on port: ${port}`));