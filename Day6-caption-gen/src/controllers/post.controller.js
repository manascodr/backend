import { generateCaption } from "../service/ai.service.js";
import { uploadFile } from "../service/storage.service.js";
import postModel from "../models/post.model.js";
import { v4 } from "uuid";

async function createPostController(req, res) {
  const file = req.file;
  console.log("file", file);

  const base64Image = new Buffer.from(file.buffer).toString("base64"); // convert image buffer to base64 string

  //   const caption = await generateCaption(base64Image); // generate caption using ai service

  //   const result = await uploadFile(file.buffer, `${v4()}`); // upload to imagekit and get the url of the image

  const [result, caption] = await Promise.all([
    uploadFile(file.buffer, `${v4()}`),
    generateCaption(base64Image),
  ]);

  const post = await postModel.create({
    caption,
    imageUrl: result.url,
    user: req.userId,
  });

  res
    .status(201)
    .json({ message: "post created successfully", caption, result });
}

export { createPostController };
