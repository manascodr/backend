import express from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.jwt_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token",token)

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  res.status(200).json({
    message: "Login successful",
    user,
  });
});

router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return req.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_SECRET);
    const user = await userModel.findOne({
      _id: decoded.id,
    }).select("-password")

    res.status(200).json({
      message: "user data fetched successfully",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
});

export default router;
