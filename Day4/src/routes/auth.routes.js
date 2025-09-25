import express from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body; // data from client

  const user = await userModel.create({
    // saving data to db
    username,
    password,
  });

  const token = jwt.sign(
    // create a token
    {
      id: user._id, // payload (data you want to store in the token
    },
    //after saving data to db we get the user id from user._id instantly
    process.env.jwt_SECRET, 
    { expiresIn: "1h" }
  );

  res.cookie("token", token); // send the token to client in the form of cookie

  res.status(201).json({
    // response to client
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
    const decoded = jwt.verify(token, process.env.jwt_SECRET); // verify the token

    // get the user from db using the id in the token
    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password"); // exclude password from the result

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
