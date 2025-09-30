import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import userModel from "../models/user.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createPostController } from "../controllers/post.controller.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), createPostController);

export default router;
