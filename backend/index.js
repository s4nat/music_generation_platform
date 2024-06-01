//packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utilities
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);


app.get("/", (req, res) => {
    console.info("INFO: Server Started Successfully");
    res.json({ "message:": "Welcome to Wubble Test API" });
});


app.listen(port, () => console.log(`Server running on port: ${port}`));