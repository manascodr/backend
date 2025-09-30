import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function registerController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username,
  });
  if (existingUser) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
    
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    message: "User Registered successfully",
    user,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
    },
  });
}

export { registerController, loginController };
