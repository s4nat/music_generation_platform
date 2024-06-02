import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { generateMusic, getMusic } from "../controllers/fileController.js";

const router = express.Router();

router.route("/generate_music").post(authenticate, generateMusic);
router.route("/download/:fileId").get(authenticate, getMusic);

export default router;