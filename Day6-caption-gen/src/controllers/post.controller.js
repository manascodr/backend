import postModel from "../models/post.model.js";
import multer from "multer";
import userModel from "../models/user.model.js";
import { generateCaption } from "../service/ai.service.js";

async function createPostController(req, res) {
  const file = req.file;
  console.log("file", file);

  const base64Image = new Buffer.from(file.buffer).toString("base64");

  const caption = await generateCaption(base64Image);
  console.log("caption", caption);
}

export { createPostController };
