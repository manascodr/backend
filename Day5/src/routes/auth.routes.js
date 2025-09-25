import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    // findOne will return null if user not exist
    username,
  });

  if (isUserAlreadyExists) {
    // null means false so it will not run
    return res.status(409).json({
      // if user exists it will return and exit
      message: "username already in use",
    });
  }

  const user = await userModel.create({ username, password });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(201).json({
    message: "user resgistered successfully",
    user,
  });
});

router.get("/user", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  try {
    //
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // if token is not valid it will throw error and go to catch block

    // if token is valid it will return the payload which we passed while creating the token
    // in our case payload is {id: user._id}

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    return res.status(200).json({
      message: "user fetched successfully",
      user,
    });
  } catch (err) {
    res.status(401).json({
      message: "invalid token",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    // it will return null if user not found and user object if found
    username,
  });
  if (!user) {
    return res.status(404).json({
      message: "user account not found",
    });
  }
  const isPasswordValid = user.password === password; // compare password with hashed password in db
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // create token with user id as payload
  res.cookie("token", token, {
    expires: new Date(Date.now() + 8 * 3600000), // cookie will expire in 8 hours
  }); // set token in cookie

  res.status(200).json({
    message: "user logged in successfully",
    user,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token"); // clear the token cookie
  res.status(200).json({
    message: "user logged out successfully",
  });
});

export default router;
